import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import {Linking} from 'expo';

import { Block, Text, Button, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';
import Images from "../constants/Images";
import { iPhoneX, HeaderHeight } from "../constants/utils";
const { height, width } = Dimensions.get('window');

export default class Product extends React.Component {
  state = {
    selectedSize: null,
  };

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
                <Text size={28} style={{ paddingBottom: 24 }}>{product.title}</Text>
                <Block row space="between">
                  <Block row>
                    <Block>

                      {/* Product Info details */ }
                      <Text size={16} color={materialTheme.COLORS.WARNING}><Icon name="shape-star" family="GalioExtra" size={14}/> {product.rating}  </Text>
                      <Text size={16}><Icon name="comment" color={materialTheme.COLORS.LABEL} family="Material" size={14} /> {product.reviewCount} </Text>
                      <Text size={16}><Icon name="phone" color={materialTheme.COLORS.LABEL} family="Material" size={14} /> {product.phone} </Text>
                      
                      {/* Opens external link as button */ }
                      <TouchableHighlight
                        style={styles.sizeButton}
                        underlayColor={materialTheme.COLORS.PRICE_COLOR}
                        onPress={() => Linking.openURL(product.url)}>
                        <Text color={theme.COLORS.PRIMARY}>See on Yelp</Text>
                      </TouchableHighlight>
                    </Block>
                  </Block>
                  <Text size={18} bold>{product.isClosed ? "Closed" : "Open"}</Text>
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
  galleryImage: {
    width: width,
    height: 'auto'
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 10,
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    marginRight: 8,
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: materialTheme.COLORS.BORDER_COLOR,
    overflow: 'hidden',
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: materialTheme.COLORS.PRICE_COLOR,
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0,
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0,
  },
});
