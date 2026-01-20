/* eslint-disable react/jsx-curly-brace-presence */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import config from "../../../config";
import {
  Dashboard,
  WardsList,
  AddPatient,
  StaffList,
  PatientsList,
  StaffDetail,
  WardPatientsList,
  PatientDetail,
  InviteMember,
  Round,
  MyAccount,
  Profile,
  AddPlan,
  ViewParity,
  MedicationList,
  DrugList,
  PatientActions,
  AddDrug,
  AddBaby,
  BabyDetails,
  AssignWard,
  CalculateBiShop,
  DeliveryCompleted,
  MedicationHistory,
  Apgar,
  ViewLcg,
  NotificationList,
} from "../../../screens";
import { commonStack } from "../../navigatorAction";
import { LCGCustomHeader } from "../../../components";
import LCGCustomHeaderAddPatient from "../../../components/customHeader/LCGCustomHeaderAddPatient";
import LCGHomeHeader from "../../../components/customHeader/LCGHomeHeader";
import routes from "../../../config/routes";
import LCGCustomHeader1 from "../../../components/customHeader/LCGCustomHeader1";
import LCGInviteHeader from "../../../components/customHeader/LCGInviteHeader";
import LCGCustomHeader2 from "../../../components/customHeader/LCGCustomHeader2";

/**
 * This function returns the common stacks for all tabs
 * @returns
 */
const getCommonStacks = (navigation) => {
  const CommonStackNav = createNativeStackNavigator();
  return commonStack.map((item) => {
    return (
      <CommonStackNav.Screen
        key={item.name}
        name={item.name}
        component={item.component}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() =>
                  item.leftAccessoryPressType === "drawer"
                    ? navigation.openDrawer()
                    : navigation.goBack()
                }
                leftAccessoryName={item.leftAccessoryName}
                title={item.title}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />
    );
  });
};

const DashboardStackNav = createNativeStackNavigator();
export const DashboardStack = ({ navigation }) => {
  return (
    <DashboardStackNav.Navigator>
      <DashboardStackNav.Screen
        name={config.routes.DASHBOARD}
        component={Dashboard}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGHomeHeader
                route={route}
                isAddPatients={false}
                onPressRightAccessory={() =>
                  navigation.navigate(config.routes.NOTIFICATION_LIST)
                }
                onPressAddPatient={() =>
                  navigation.navigate(routes.ADD_PATIENT)
                }
                leftAccessoryName={config.iconNames.SIDE_MENU}
                title={config.screenNames.DASHBOARD_SCREEN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      {/* <DashboardStackNav.Screen
        name={config.routes.NOTIFICATION_LIST}
        component={NotificationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.NOTIFICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      /> */}

      {getCommonStacks(navigation)}
    </DashboardStackNav.Navigator>
  );
};

const AddPatientStackNav = createNativeStackNavigator();
export const AddPatientStack = ({ navigation }) => {
  return (
    <AddPatientStackNav.Navigator>
      <AddPatientStackNav.Screen
        name={config.routes.ADD_PATIENT}
        component={AddPatient}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeaderAddPatient
                route={route}
                onPressLeftAccessory={() => {
                  navigation.navigate(config.routes.PATIENTS_LIST_STACK);
                }}
                leftAccessoryName={config.iconNames.CROSS_LIGHT}
                title={config.screenNames.ADD_PATIENT_SCREEN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.PATIENTS_LIST_STACK)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      {getCommonStacks(navigation)}
    </AddPatientStackNav.Navigator>
  );
};

const PatientsStackNav = createNativeStackNavigator();
export const PatientsStack = ({ navigation }) => {
  return (
    <PatientsStackNav.Navigator>
      <PatientsStackNav.Screen
        name={config.routes.PATIENTS_LIST}
        component={PatientsList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGHomeHeader
                route={route}
                onPressRightAccessory={() =>
                  navigation.navigate(config.routes.NOTIFICATION_LIST)
                }
                onPressAddPatient={() =>
                  navigation.navigate(routes.ADD_PATIENT)
                }
                leftAccessoryName={config.iconNames.SIDE_MENU}
                title={config.screenNames.DASHBOARD_SCREEN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.PATIENTS_DETAIL}
        component={PatientDetail}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.CROSS_LIGHT}
                title={config.strings.OTHERS.Labour_Care_Guide}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.WardsList)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.ADD_PLAN}
        component={AddPlan}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ADD_PLAN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.PATIENTS_ACTIONS}
        component={PatientActions}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.PATIENTS_ACTIONS}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.ADD_BABY}
        component={AddBaby}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={
                  route?.params?.from == "edit"
                    ? config.screenNames.EDIT_BABY
                    : config.screenNames.ADD_BABY
                }
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.BABY_DETAILS}
        component={BabyDetails}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.BABY_DETAILS}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.ASSIGN_WARD}
        component={AssignWard}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ASSIGN_WARD}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.VIEW_PARITY}
        component={ViewParity}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.VIEW_PARITY}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.MEDICATION_LIST}
        component={MedicationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.MEDICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.DRUG_LIST}
        component={DrugList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.DRUG_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.ADD_DRUG}
        component={AddDrug}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ADD_DRUG}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.CALUCULATE_BISHOP}
        component={CalculateBiShop}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                // rightAccessory={config.strings.OTHERS.DONE}
                // onPressRightAccessory={() => navigation.goBack()}
                title={config.screenNames.CALUCULATE_BISHOP}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.DELIVERY_COMPLETED}
        component={DeliveryCompleted}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={
                  route?.params?.from == "edit"
                    ? config.screenNames.EDIT_DELIVERY_DETAILS
                    : config.screenNames.DELIVERY_COMPLETED
                }
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.MEDICATION_HISTORY}
        component={MedicationHistory}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.MEDICATION_HISTORY}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.APGAR}
        component={Apgar}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.APGAR}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.VIEW_LCG}
        component={ViewLcg}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.VIEW_LCG}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.ADD_PATIENT}
        component={AddPatient}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeaderAddPatient
                route={route}
                onPressLeftAccessory={() => {
                  navigation.navigate(config.routes.PATIENTS_LIST);
                }}
                leftAccessoryName={config.iconNames.CROSS_LIGHT}
                title={
                  route?.params?.from == "edit"
                    ? config.screenNames.EDIT_PATIENT_SCREEN
                    : config.screenNames.ADD_PATIENT_SCREEN
                }
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.PATIENTS_LIST)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.NOTIFICATION_LIST}
        component={NotificationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.NOTIFICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <PatientsStackNav.Screen
        name={config.routes.MY_ACCOUNT}
        component={MyAccount}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGHomeHeader
                route={route}
                onPressLeftAccessory={() => navigation.openDrawer()}
                onPressAddPatient={() =>
                  navigation.navigate(routes.ADD_PATIENT)
                }
                onPressRightAccessory={() =>
                  navigation.navigate(config.routes.NOTIFICATION_LIST)
                }
                leftAccessoryName={config.iconNames.SIDE_MENU}
                title={"Account"}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      {getCommonStacks(navigation)}
    </PatientsStackNav.Navigator>
  );
};

const RoundStackNav = createNativeStackNavigator();
export const RoundsStack = ({ navigation }) => {
  return (
    <RoundStackNav.Navigator>
      <RoundStackNav.Screen
        name={config.routes.ROUND}
        component={Round}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGHomeHeader
                route={route}
                onPressAddPatient={() =>
                  navigation.navigate(routes.ADD_PATIENT)
                }
                onPressRightAccessory={() =>
                  navigation.navigate(config.routes.NOTIFICATION_LIST)
                }
                leftAccessoryName={config.iconNames.SIDE_MENU}
                title={"Round"}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.NOTIFICATION_LIST}
        component={NotificationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.NOTIFICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.ADD_PLAN}
        component={AddPlan}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ADD_PLAN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.VIEW_PARITY}
        component={ViewParity}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.VIEW_PARITY}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.MEDICATION_LIST}
        component={MedicationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.MEDICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.DRUG_LIST}
        component={DrugList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.DRUG_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.ADD_DRUG}
        component={AddDrug}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ADD_DRUG}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.MEDICATION_HISTORY}
        component={MedicationHistory}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.MEDICATION_HISTORY}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <RoundStackNav.Screen
        name={config.routes.VIEW_LCG}
        component={ViewLcg}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.VIEW_LCG}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      {getCommonStacks(navigation)}
    </RoundStackNav.Navigator>
  );
};

const MyAccountStackNav = createNativeStackNavigator();
export const MyAccountStack = ({ navigation }) => {
  return (
    <MyAccountStackNav.Navigator>
      <MyAccountStackNav.Screen
        name={config.routes.MY_ACCOUNT}
        component={MyAccount}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGHomeHeader
                route={route}
                onPressAddPatient={() =>
                  navigation.navigate(routes.ADD_PATIENT)
                }
                onPressRightAccessory={() =>
                  navigation.navigate(config.routes.NOTIFICATION_LIST)
                }
                leftAccessoryName={config.iconNames.SIDE_MENU}
                title={"Account"}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.NOTIFICATION_LIST}
        component={NotificationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.NOTIFICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.WARDS_LIST}
        component={WardsList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.WARDS_LIST_SCREEN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.WARD_PATIENTS_LIST}
        component={WardPatientsList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={route?.params?.title}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.STAFF_LIST}
        component={StaffList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.STAFF_LIST_SCREEN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.STAFF_DETAIL}
        component={StaffDetail}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.STAFF_DETAIL_SCREEN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.ADD_PLAN}
        component={AddPlan}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ADD_PLAN}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.PATIENTS_ACTIONS}
        component={PatientActions}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.PATIENTS_ACTIONS}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.ADD_BABY}
        component={AddBaby}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={
                  route?.params?.from == "edit"
                    ? config.screenNames.EDIT_BABY
                    : config.screenNames.ADD_BABY
                }
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.BABY_DETAILS}
        component={BabyDetails}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.BABY_DETAILS}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.ASSIGN_WARD}
        component={AssignWard}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ASSIGN_WARD}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.VIEW_PARITY}
        component={ViewParity}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.VIEW_PARITY}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.MEDICATION_LIST}
        component={MedicationList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.MEDICATION_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.DRUG_LIST}
        component={DrugList}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.DRUG_LIST}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.ADD_DRUG}
        component={AddDrug}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.ADD_DRUG}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.CALUCULATE_BISHOP}
        component={CalculateBiShop}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader2
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                rightAccessory={config.strings.OTHERS.DONE}
                onPressRightAccessory={() => navigation.goBack()}
                title={config.screenNames.CALUCULATE_BISHOP}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.DELIVERY_COMPLETED}
        component={DeliveryCompleted}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={
                  route?.params?.from == "edit"
                    ? config.screenNames.EDIT_DELIVERY_DETAILS
                    : config.screenNames.DELIVERY_COMPLETED
                }
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.MEDICATION_HISTORY}
        component={MedicationHistory}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                title={config.screenNames.MEDICATION_HISTORY}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.APGAR}
        component={Apgar}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader2
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.LEFT_CHEVRON}
                rightAccessory={config.strings.OTHERS.DONE}
                onPressRightAccessory={() => navigation.goBack()}
                title={config.screenNames.APGAR}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.DASHBOARD)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      <MyAccountStackNav.Screen
        name={config.routes.PATIENTS_DETAIL}
        component={PatientDetail}
        options={({ route }) => ({
          header: () => {
            return (
              <LCGCustomHeader1
                route={route}
                onPressLeftAccessory={() => navigation.goBack()}
                leftAccessoryName={config.iconNames.CROSS_LIGHT}
                title={config.strings.OTHERS.Labour_Care_Guide}
                titleLeftAccessory={({ imageStyle }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(config.routes.WardsList)
                      }
                    >
                      <Image
                        style={imageStyle}
                        source={config?.images?.cvdNavTitleLeftAccessory}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          },
        })}
      />

      

      {getCommonStacks(navigation)}
    </MyAccountStackNav.Navigator>
  );
};
