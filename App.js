import { StyleSheet, Text, View, TextInput } from 'react-native';
import {AsyncStorage} from 'react-native';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import React, {useState, useEffect} from 'react';



export default function App() {
  const [data, setData] = useState([]);
  const [text, onChangeText] = React.useState('');

  const nameOfCols = ['isim', 'yaş', 'hastane'];
  

  fetch("http://depremkayipilan.com:8080/get_data_mobile")
   .then(response => {
     return response.json();
   })
   .then(responseJson => {
      //AsyncStorage.setItem("resdata",responseJson);
      setData(responseJson["data"]);
   }).catch(error => {
     if (error) {
        AsyncStorage.getItem("resdata").then((value) => {
          setData(value["data"]);
        });
     }
   });
  return (
    <View style={styles.container}>
      <View style={{height:"25%"}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Ara"
        />
      </View>
      <View style={{height:"75%"}}>
        <DataTable
            data={data.filter((item) => {
              if (text === "") {
                return item;
              } else if (
                item.isim.toLowerCase().includes(text.toLowerCase())
              ) {
                return item;
              }
            })}
            colNames={nameOfCols}
            colSettings={[
                {
                  name: 'isim',
                  sortable: true
                }, 
                {
                  name: 'yaş',
                  sortable: true
                },
                {
                  name: 'hastane',
                  sortable: true
                }
              ]}
            noOfPages={10}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 240,
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor:"e8e8e8",
    padding: 10,
  },
});
