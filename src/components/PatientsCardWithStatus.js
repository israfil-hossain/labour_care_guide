/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import CardView from './CardView';
import fontFamily from '../config/fontFamily';

const RowWithKeyValue = props => {
  const {unit, value, color1 = '#38D492', color2 = '#393766'} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.LATO_BOLD_700,
          fontWeight: '700',
          fontSize: 20,
          letterSpacing: 0.02,
          fontStyle: 'normal',
          color: color1,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.LATO_BOLD_700,
          fontWeight: '700',
          fontSize: 12,
          letterSpacing: 0.02,
          fontStyle: 'normal',
          color: color2,
          marginLeft: 6,
        }}
      >
        {unit}
      </Text>
    </View>
  );
};

const RowWithStatus = props => {
  const {unit, value, icon, color1 = '#FF9201'} = props;
  return (
    <View
      style={{
        marginBottom: 5,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
        <Text
          style={{
            fontFamily: fontFamily.LATO_BOLD_700,
            fontWeight: '600',
            fontSize: 14,
            marginLeft: 17,
            fontStyle: 'normal',
            color: '#25282B',
          }}
        >
          {unit}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: fontFamily.LATO_BOLD_700,
          fontWeight: '700',
          fontSize: 15,
          fontStyle: 'normal',
          color: color1,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const GlanceButton = () => {
  return (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFE2EB',
        borderWidth: 0.7,
        borderColor: '#FC5285',
        borderRadius: 13,
        paddingHorizontal: 5,
      }}
    >
      <Text
        style={{
          marginRight: 6,
          textAlign: 'center',
          fontFamily: fontFamily.LATO_REGULAR_400,
          fontWeight: '600',
          fontSize: 10,
          color: '#25282B',
        }}
      >
        At a Glance
      </Text>
      <Image source={require('../assets/images/arrow.png')} />
      <Image source={require('../assets/images/arrow.png')} />
    </View>
  );
};

const PatientsCardWithStatus = props => {
  const {title, id, age, onPress} = props;
  // title="Dr. Christino Murphy"
  // id="PL0020"
  // proffesion="Nurse"
  // institution="Apollo Hospital"
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
      }}
    >
      <CardView
        cardElevation={1}
        cardMaxElevation={1}
        cornerRadius={6}
        style={{
          backgroundColor: '#fff',
          marginVertical: 10,
          paddingTop: 12,
          paddingBottom: 13,
          paddingHorizontal: 10,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View>
              <Image
                style={{
                  marginLeft: 5,
                  borderRadius: 26,
                }}
                source={require('../assets/images/demo/demoDoc.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.LATO_BOLD_700,
                    fontWeight: '600',
                    fontSize: 15,
                    color: '#25282B',
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.LATO_REGULAR_400,
                    fontWeight: '400',
                    fontSize: 13,
                    color: '#25282B',
                    marginTop: 5,
                  }}
                >
                  UHID:{' '}
                  <Text
                    style={{
                      fontFamily: fontFamily.LATO_BOLD_700,
                      fontWeight: '600',
                      fontSize: 13,
                      color: '#8D939E',
                      marginTop: 5,
                    }}
                  >
                    {id}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.LATO_REGULAR_400,
                    fontWeight: '400',
                    fontSize: 13,
                    color: '#25282B',
                    marginTop: 5,
                  }}
                >
                  Age:{' '}
                  <Text
                    style={{
                      fontFamily: fontFamily.LATO_BOLD_700,
                      fontWeight: '600',
                      fontSize: 13,
                      color: '#8D939E',
                      marginTop: 5,
                    }}
                  >
                    {age}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Image
                  style={{
                    marginRight: 10,
                  }}
                  source={require('../assets/images/dashboard/redFlag.png')}
                />
                <Image
                  style={{
                    marginLeft: 5,
                  }}
                  source={require('../assets/images/menuOptionIcon.png')}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: 10,
              backgroundColor: '#F5F6F9',
              borderWidth: 1,
              borderColor: '#DFE3EE',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}
            >
              <RowWithKeyValue unit="MHR" value="80" />
              <RowWithKeyValue unit="MHR" value="200/75" color1="#EA3E2B" />
              <RowWithKeyValue unit="FHR" value="140" />
            </View>
            <View
              style={{
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}
            >
              <RowWithKeyValue unit="°F Temp " value="90" />
              <RowWithKeyValue unit="UC" value="4" />
              <GlanceButton />
            </View>
          </View>

          <View>
            <RowWithStatus
              unit="Delivery Status:"
              value="Delivery Started"
              icon={
                <Image
                  source={require('../assets/images/deliveryStatus.png')}
                  style={{
                    width: 14,
                    height: 21,
                  }}
                />
              }
            />

            <RowWithStatus
              unit="Baby Status:"
              value="1 Baby Delivered"
              color1="#7D8491"
              icon={
                <Image
                  source={require('../assets/images/baby.png')}
                  style={{
                    width: 17,
                    height: 15,
                  }}
                />
              }
            />
          </View>
        </View>
      </CardView>
    </Pressable>
  );
};

export default PatientsCardWithStatus;
