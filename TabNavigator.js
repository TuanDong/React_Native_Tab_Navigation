import React, { Component } from 'react';
import { Text, View ,ListView,Image,FlatList,Dimensions} from 'react-native';
import { createBottomTabNavigator,createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator, } from "react-navigation-material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
//  find name icon: "\node_modules\react-native-vector-icons\glyphmaps\Ionicons.json"
//https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html
//https://www.youtube.com/watch?v=hWMn32erJ2g

class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text>Home! test FlatList</Text>
                <FlatList
                    data={[{key:"1",data:"Binh Chon",url:require("./image/vote-128.png")}, {key:'2',data:"Bo phiu",url:require("./image/vote-badge.png")}]}
                    renderItem={({item}) => <Text style={{padding:10}} style={{height:80,width:Dimensions.width,borderColor: '#388fb7', borderWidth: 1}}><Image source={item.url} style={{height:50,width:50}}/>{item.data}</Text>}
                />
            </View>
        );
    }
}

class SettingsScreen extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([{data:"Hoa Don",url:require("./image/bill-lost.png")}, {data:"Binh Chon",url:require("./image/vote-128.png")}]),
        };
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Text list view, ListView is deprecated the future</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => 
                    <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",padding:10,borderColor: '#388fb7', borderWidth: 1}}>
                    <Image source={rowData.url} style={{height:30,width:30}}/>
                    <Text>{rowData.data}</Text>
                    </View>
                    }
                />
            </View>
        );
    }
}

const TabNavigator = createAppContainer(createMaterialBottomTabNavigator/*createMaterialTopTabNavigator*/(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Dữ liệu',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons size={30} name={`md-checkmark-circle${focused ? '' : '-outline'}`} style={{ color: tintColor }} />
                )
            }
        },
        Settings: SettingsScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {//boolean,boolean,string
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-settings`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        // tabBarOptions:
        // {
        //     activeColor: '#3e2465',
        //     inactiveColor: '#726887',
        //     barStyle: { backgroundColor: '#e5bd67' },
        // } i cann't undertand tabBarOptions isn't working
        activeColor: '#3e2465',
        inactiveColor: '#726887',
        barStyle: { backgroundColor: '#e5bd67' },
    }
));

export default TabNavigator;