
import React, { Component } from "react";
import {Text, Linking} from "react-native";
import { Container, Content, Accordion } from "native-base";
import { Button } from 'react-native-elements';
const dataArray = [

  {
    //FAQ 1
    title: "1. How do I pawn (We call it Fundex!) my \r\n item online?",
    content: <Text>•	Click on the PAWN button on the home screen.{"\r\n \r\n"}•	First you take a picture of your item (also known as a pledge) using the Fundex app. Take multiple pictures if necessary to show a 360-degree view of the pledge. Make sure the photo quality is clear. Upload the pictures.{"\r\n \r\n"}•	Fill in the known details of your pledge (type, purity, weight etc.) and leave blank those that you are unsure of.{"\r\n \r\n"}•	You will receive an estimated quote for your pledge that is based on current market prices.{"\r\n \r\n" } •	Should you be satisfied with the estimated quote, please bring your pledge down to any of our 6 pawnshops <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com.sg/maps/search/fund+express+pawn+shop+singapore')}>HERE</Text>  for our master appraisers to verify its authenticity and current state of wear and tear.{"\r\n \r\n"}•	You will then be offered a final loan value for your pledge. It should not be too far from the quote you originally received from our Fundex app if the details provided are in sync with the actual pledge.\r\n \r\n•	Should you be happy with the loan value, a digital pawn ticket will be issued and funds will be credited into your Fundex digital wallet! The option of cash is also available. {"\r\n \r\n"}•	Let’s start fundexing!</Text>
  },
  {
    //FAQ 2
    title: "2.	What is the minimum and maximum loan \r\n amount I can get for a pledge?",
    content: "•	There is no min or max amount. What you receive is dependent on the value of your pledge."
  },
  {
    //FAQ 3
    title: "3.	Are my pledges insured?",
    content: "•	Pledges are kept in a secure built in vault (within each pawnshop) that is fire resistant, coupled with a time lock and 24 hours CCTV surveillance offering maximum security. \r\n \r\n •	All pledges are fully insured and in the unlikely event that pledges are stolen or lost, the company insurer will cover the liabilities."
  },
  {
    //FAQ 4
    title: "4.	How do I renew my pledge?",
    content: "•	Click on the RENEW button on the HOME screen. Online renewal is as easy as a tap away. Simple and without the hassle and worry of keeping your pawn tickets in check! \r\n \r\n•	You can also choose to pay the accumulated interest as well as a portion of the principle loan amount to reduce your future liabilities which include interest payments.\r\n \r\n•	Turn on push notifications so that the Fundex app can alert you to renew! You can set the time of reminder (e.g. a week or 3 days before expiring of your digital pawn ticket)."
  },
  {
    //FAQ 5
    title: "5.	How do I redeem my pledge?",
    content: "•	Click on the REDEEM button on the HOME screen when you have a confirmed schedule and the app will remind you and require your confirmation on the same day of your collection date. \r\n \r\n •	You will be prompted to pay the principle pawn amount and any accumulated interest, as well as state the time of collection so we can facilitate an efficient pick-up. \r\n \r\n •	Make a trip down to the same pawnshop where you first dropped-off your pledge. \r\n \r\n•	In the event your ewallet has insufficient funds, you can pay in cash at our pawnshop before we release the pledge or top up your ewallet via internet banking and use it to redeem your pledge. \r\n \r\n •	If you do not come down to collect your pledge before the month of your expiry date ends, your account will be charged 1.5% interest per month starting from the next month."
  },
  {
    //FAQ 6
    title: "6.	Can I ask someone else to collect my pledge \r\n on my behalf?",
    content: "•	Yes you can. Please state his/her name, identification number, mobile phone number, and time of collection. An SMS will then be sent to him/her. Make sure he/she comes down to the correct pawnshop and show us the SMS together with his/her identification documents!"
  },
  {
    //FAQ 7
    title: "7.	What if I forgot to renew or redeem my \r\n pledge within the stipulated duration (6 months \r\n from time of pawning)?",
    content: "•	Within the first week of the 7th month from the time of pawning, you will receive an SMS notification to renew or redeem your pledge before the 15th day of the same month. \r\n \r\n •	If you fail to do so, we will send a reminder letter to your registered home address on the 15th day. So please update your personal details as soon as possible if there are any changes! \r\n \r\n •	If your pledge is not redeemed or renewed on the 15th day of the 8th month after pawning, your pledge will then become the property of the pawnshop by law. You can check the status of your pledge on the Fundex app. Note that your credit rating with us will change as the algorithm picks this up and updates your credit rating accordingly."
  },
  {
    //FAQ 8
    title: "8.	What if I still want my item after it gets \r\n forfeited?",
    content: "•	If you want your item back, you have to purchase it at our selling price if it is still on display."
  },
  {
    //FAQ 9
    title: "9.	What does my credit rating mean?",
    content: "•	We have a credit rating algorithm in place to determine a customer’s credit-worthiness depending on how “good” a customer is. For example, renewing and redeeming on time as well as being a regular will increase your credit score while paying late and not redeeming or renewing your pledge will decrease it. \r\n \r\n •	Your credit score will affect the value offered to you with regards to pawning or selling, as well as your eligibility for any special promotions and discounts."
  },
  {
    //FAQ 10
    title: "10.	Can I sell my pledge after I pawn (Fundex) it?",
    content: <Text>•	Click on the SELL button on the HOME screen. You will be prompted to choose between the NEW ITEM or PAWNED ITEM options. Our buyback price for both options is not only based on the current market value but also on the state of your pledge and its sell-ability. It is up to the management’s discretion whether to buy your item. {"\r\n \r\n"} •	Select NEW ITEM if you have not pawned your item with us. Similar to the online pawning process, we need you to take pictures of your item as well as fill in its description. An estimated value based on current market prices will be shown on the screen. Should you be happy to proceed, please head down to the nearest pawnshop <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com.sg/maps/search/fund+express+pawn+shop+singapore')}>HERE</Text> where our master appraisers will examine your item and provide you with a final offer. If you accept the offer, you will receive instant funds in your ewallet or cash at the pawnshop! Please note that the pawnshop’s management has no obligation to accept your item if we find it to be a fake or damaged.{"\r\n \r\n"}•	Select PAWNED ITEM if you have pawned your item with us. Note that you will only receive a positive amount if the current market value of your pledge is more than the initial value which you pawned for, and will be less of the accumulated interest. Any positive amount will be shown on the screen. If the current market value of your pledge is NOT more than the initial pawn value, a notification will pop up informing you that you’re unable to get any additional value from your pledge. Instead of defaulting and reducing your credit rating, you can still proceed to pay the accumulated interest and relieve yourself of the principle amount as well as future interest payments!</Text>
  },
  {
    //FAQ 11
    title: "11.	If my pledge increases in value, can I \r\n increase my loan amount and get more cash?",
    content: "•	Yes you can! Click on the RENEW button on the HOME screen. If the current market value of your pledge rises in value, the additional amount you can get above your initial pawn value will be reflected on the screen. Take note that accumulated interest will be prorated monthly and deducted should you choose to proceed.\r\n \r\n•	In cases that you have initially requested for only part of the loan value on your pledge, you can now take more loan from it. The additional amount you can get is again based on the current market value of your pledge less of the accumulated interest prorated monthly.\r\n \r\n•	Should the additional amount less of accumulated interest be negative, or if your pledge decreases in value due to lower market prices, a notification will pop up informing you that you’re unable to get any additional value from your pledge."
  },
  {
    //FAQ 12
    title: "12.	How is the interest calculated?",
    content: "•	It is as low as 1% for the first month and only 1.5% for subsequent months! \r\n \r\n•	Minimum monthly interest charged is $1.\r\n \r\n •	Interest is prorated by month and not by day."
  },
  {
    //FAQ 13
    title: "13.	What is the minimum legal age to proceed \r\n with a pawn transaction?",
    content: "•	According to the Pawnbrokers Act, you must be 18 years of age and above to engage in a pawn transaction with us. The Fundex app will not allow underaged users to pawn. \r\n \r\n•	There is no age restriction when buying or selling."
  },
  {
    //FAQ 14
    title: "14.	What items do we accept as collateral?",
    content: "•	Gold (bullion, scrap) \r\n \r\n •	Gold jewellery (plated, stoned, ruby, sapphire, emerald, diamond, pearl)\r\n \r\n•	Silver (bullion)\r\n \r\n •	Platinum (bullion)\r\n \r\n •	Diamonds \r\n \r\n•	Luxury timepieces"
  },
  {
    //FAQ 15
    title: "15.	You have an ecommerce section too?",
    content: <Text>•	Yes we do! Click on the BUY button on the HOME screen for the range of items we have in stock. We retail both new and second-hand jewellery and bullion which gets updated every few days. Rest assured that second-hand items are thoroughly disinfected and polished so they look as good as new, but for a fraction of the price. {"\r\n \r\n"} •	We don’t charge GST or workmanship fees so prices can be at least 20% cheaper than jewellery boutiques, and perhaps even more! {"\r\n \r\n"} •	You can come down to any of our pawnshops located <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com.sg/maps/search/fund+express+pawn+shop+singapore')}>HERE</Text> , or you can choose to have the items delivered to your doorstep.</Text>
  },
  {
    //FAQ 16
    title: "16.	What if I want to repair or maintain my \r\n jewellery?",
    content: <Text>•	Head down to any of our 6 outlets <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com.sg/maps/search/fund+express+pawn+shop+singapore')}>HERE</Text>. We can even do it for free if it’s just a simple and quick fix! </Text>
  },
  {
    //FAQ 17
    title: "17.	Can I top-up or withdraw my digital cash?",
    content: "•	Yes you can top-up or withdraw digital cash via internet banking or PayNow and this can be done within the Fundex App."
  },
  {
    //FAQ 18
    title: "18.	Can I still go to any of your pawnshops to \r\n pawn or sell?",
    content: <Text>•	Of course you can! Head down to any of our pawnshops <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com.sg/maps/search/fund+express+pawn+shop+singapore')}>HERE</Text>  with your valuables and personal identification documents (NRIC, driving license, work permit, passport). Our master appraisers have over 30 years of experience in valuation and, with the help of cutting-edge appraisal instruments, will offer you an accurate and fair quote for your item on the spot based on live market prices and the item’s condition. Tedious and time-consuming credit checks won’t be necessary. Should you choose to accept the offer, you’ll receive instant cash along with a hard copy of the pawn ticket.</Text>
  },
  {
    //FAQ 19
    title: "19.	Is there more to come from Fundex?",
    content: "•	Yes! We are working on a couple of exciting projects, one of which is collaborating with a fleet of delivery services to deliver your pledge to us anytime, anywhere so you won’t have to take a single step out of your house. The same applies if you choose to redeem. Your item will be delivered right to your doorstep! Stay tuned and keep fundexing!"
  },
  {
    //FAQ 20
    title: "20.	How do I reach out for further enquiries?",
    content: "•	For all other enquiries, reach out to us HERE. We will typically respond within 1 working day!"
  }

];
export default class AccordionExample extends Component {
  static navigationOptions = {
    title: "FAQ",
      headerStyle: {
        backgroundColor: "#C00000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Accordion dataArray={dataArray} />
        </Content>
      </Container>
    );
  }
}
