import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import {Linking} from 'expo';

import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';
import { iPhoneX, HeaderHeight } from "../constants/utils";
const { width } = Dimensions.get('window');

export default class DetailedResultScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const { params } = navigation && navigation.state;
    const product = params.product;

    return (
        <Block flex style={styles.product}>
          <Block flex style={{ position: 'relative' }}>
          <Image
            resizeMode="cover"

            // Attemps to load the image, but if nothing is available, will use a placeholder
            source={{ uri: product.image == '' || product.image == null || product.image == undefined? 'https://via.placeholder.com/150' : product.image }}
            style={{ width, height: iPhoneX ? width + 32 : width }}
          />
          </Block>
          <Block flex style={styles.options}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE * 2 }}>

                {/* Result Title */ }
                <Text size={28} style={{ paddingBottom: 24 }}>{product.title}</Text>
                <Block row space="between">
                  <Block row>
                    <Block>

                      {/* Result Details */ }
                      <Text size={16} color={materialTheme.COLORS.WARNING}><Icon name="shape-star" family="GalioExtra" size={14}/> {product.rating}  </Text>
                      <Text size={16}><Icon name="comment" color={materialTheme.COLORS.LABEL} family="Material" size={14} /> {product.reviewCount} </Text>
                      <Text size={16}><Icon name="phone" color={materialTheme.COLORS.LABEL} family="Material" size={14} /> {product.phone} </Text>
                      
                      {/* Opens external link to listing on Yelp as a button */ }
                      <TouchableHighlight
                        style={styles.sizeButton}
                        underlayColor={materialTheme.COLORS.PRICE_COLOR}
                        onPress={() => Linking.openURL(product.url)}>
                        <Text color={theme.COLORS.PRIMARY}>See on Yelp</Text>
                      </TouchableHighlight>
                    </Block>
                  </Block>
                  
                  {/* Result is Open or Closed */ }
                  <Text size={18} bold>{product.closed ? "Closed" : "Open"}</Text>
                </Block>
              </Block>
          </Block>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
