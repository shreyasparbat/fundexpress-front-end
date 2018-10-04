import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';


const Ticket = (props) => {
  return (
    <Card
      title={props.data.item.name}
    >
    </Card>
  )

  
};

//make this component available to the app
export default Ticket;
