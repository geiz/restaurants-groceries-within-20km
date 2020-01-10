import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableHighlight, View} from 'react-native';
import { Block, theme, Text, Button } from 'galio-framework';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Product } from '../components';


const { width } = Dimensions.get('screen');

export default class GroceriesScreen extends React.Component {

  state = {
    location: null,
    errorMessage: null,
    results: null
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    // Location Async Call
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    // Calls Main Async API after Location is completed
    this._getResturantsFromApiAsync(location.coords.latitude, location.coords.longitude);
  };

  // Main Async Call. 
  // Input: latitude, longitude, and output results to State
  async _getResturantsFromApiAsync(latitude, longitude) {
    try {
      const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=groceries&latitude=${latitude}&longitude=${longitude}&radius=20000&sort_by=distance`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer uPNPfWqgsD3p3TuipKfsINXtmJmOtG9qav1_hb_xeB-hinrnKsvMqmsfXulbHLUJkfoQGDdL-7OaWoWbfY4epSAZIH16BANU3jSZMDJfR7IOOLvMXz6xFIxTbaIXXnYx'
      }});
      if (!response.ok) {
        this.setState({ errorMessage: response.statusText });
        alert(response.statusText);
      }
      const json = await response.json();
      this.setState({ results: json });
    } catch (error) {
      this.setState({ errorMessage: error });
      alert(error);
    }
  }

  // Creates a list of products whenever it is loaded async. 
  // Parameters saved after load: title, address, image, rating, reviewCount, phone, closed, url
  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
        
        { // If No results, we wait to load and give user force load option
        this.state.results == null ? 
        <Block>
          <Text>Waiting for Results to load...</Text>
          <Text color="red">{this.state.errorMessage}</Text> 
          <Button onPress={() => {this._getLocationAsync();}}>Press to Force Reload</Button>
        </Block> : // Checks to see if we have successfully loaded. If no results, will inform user there's nothing nearby, otherwise, shows results
        
        
        this.state.results.businesses.length < 1 ? <Text>No Results found :(</Text> :
        // Info to be passed to Product component. Product component will forward data to Product screen if selected 
        this.state.results.businesses.map((business, index) => <Product product={{
          title: business.name,
          address: business.location.address1,
          image: business.image_url,
          rating: business.rating,
          reviewCount: business.review_count,
          phone: business.display_phone,
          closed: business.is_closed,
          url: business.url,
          }} horizontal key={business.id}/>)
        }
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
