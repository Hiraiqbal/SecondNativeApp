import React, {useState} from 'react';
import { StyleSheet,View, Text, Button, TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen =props=>{

    const [enteredValue, setEnteredValue]=useState('');
    const [confrimed,setConfrimed]=useState(false);
    const[selectedNumber,setSelectedNumber]=useState();
    
    const numberInputHandler =inputText =>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };
    const resetInputHandler=()=>{
        setEnteredValue('');
        setConfrimed(false);
    };
    const confrimInputHandler =()=>{
        const choseNumber= parseInt(enteredValue);
        if(isNaN(choseNumber) || choseNumber <=0 || choseNumber>99){
            Alert.alert('Invalid Number!','Number has to be a number between 1 to 99',[{text:'Okay',style:"destructive",onPress:resetInputHandler}])
            return;
        }
        setConfrimed(true);
        setSelectedNumber(choseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confrimedOutput;
    if(confrimed){
        confrimedOutput= <Card style={styles.summaryContainer}>
            <Text>Selected Number</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title='Start Game' onPress={()=> props.onStartGame(selectedNumber)}/>
            </Card>
    }
    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
        <View style={styles.screen} >
            <Text style={styles.title}>Start a new game </Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <Input style={styles.input} 
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType="number-pad" 
                    maxLength={2} 
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}> 
                    <View style={styles.button}>
                        <Button title='Reset' onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Confrim' onPress={confrimInputHandler} color={Colors.primary}/>
                    </View>
                </View>
            </Card>
            {confrimedOutput}
        </View>
        </TouchableWithoutFeedback>
    );

};
const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',

    },
    title:{
        fontSize:20,
        marginVertical:10,
    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    button:{
        width:'40%',
    },
    input:{
        width:50,
        textAlign:'center',
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center',


    },
});

export default StartGameScreen;