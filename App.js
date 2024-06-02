import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SearchBar, Card, Tab, TabView, Button } from "@rneui/themed";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";

import ImageAPI from "./ImageApi";

const defaultData = {
  chassisNumber: "",
  inspectiondate: "",
  registrationdate: "",
  mileage: "",
  centre: "",
};

export default function App() {
  const [vin, onChangeVin] = useState("");
  const [vehicle, setVehicle] = useState(defaultData);
  const [index, setIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(process.env.REACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vin: vin,
      }),
    })
      .then((res) => res.json())
      .then((data) => setVehicle(data))
      .catch((error) => console.log(error));
  };

  const { chassisNumber, inspectiondate, registrationdate, mileage, centre } =
    vehicle;

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          // style={styles.input}
          placeholder="Enter vehicle chassis number..."
          onChangeText={onChangeVin}
          value={vin}
          platform="android"
          ref={(search) => this.search}
        />
        <Button
          title="search car details"
          buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ color: "white", marginHorizontal: 20 }}
          onPress={handleSubmit}
          accessibilityLabel="Learn more about this purple button"
        />

        {/* <Text style={styles.fonts}>
          The Chassis number is located in the car as illustrated below or with
          the vehicle documents
        </Text> */}
        <ImageAPI />
      </View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        containerStyle={{
          backgroundColor: "black",
        }}
        variant="primary"
      >
        <Tab.Item
          title="Vehicle History"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "timer", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="favorite"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "heart", type: "ionicon", color: "white" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Card containerStyle={{ marginTop: 15 }}>
            <Card.Title>Vehicle History</Card.Title>
            <Card.Divider />
            <Text style={styles.fonts}>Chassis : {chassisNumber}</Text>
            <Text style={styles.fonts}>Inspection Date : {inspectiondate}</Text>
            <Text style={styles.fonts}>
              Date of first registration : {registrationdate}
            </Text>
            <Text style={styles.fonts}>
              mileage at time of inspection: {mileage}
            </Text>
            <Text style={styles.fonts}>inspection centre : {centre}</Text>
          </Card>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Card containerStyle={{ marginTop: 15 }}>
            <Card.Title>Recent searches</Card.Title>
            <Card.Divider />
            <Text style={styles.fonts}>vin : BMEFS-108351</Text>
            <Text style={styles.fonts}>vin : WVWZZZAUZFW286623</Text>
            <Text style={styles.fonts}>vin : WVWZZZAUZGW009527</Text>
            <Text style={styles.fonts}>vin : WVWZZZAUZEW100000</Text>
            <Text style={styles.fonts}>vin : WDD2050422R180142</Text>
          </Card>
        </TabView.Item>
      </TabView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 30,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "50%",
    margin: "2rem 0",
  },
  fonts: {
    marginBottom: 8,
  },
});
