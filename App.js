import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View, Image, Pressable, StyleSheet, TextInput, Text, StatusBar,
  ScrollView, Modal, TouchableOpacity, Alert, KeyboardAvoidingView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREENS = {
  "10_-_A_-_Articles_and_Tips": require("./assets/screens/10_-_A_-_Articles_and_Tips.webp"),
  "10_-_B_-_Articles_and_Tips": require("./assets/screens/10_-_B_-_Articles_and_Tips.webp"),
  "11.1_-_A_-_Home": require("./assets/screens/11.1_-_A_-_Home.webp"),
  "11.2.1_-_A_-_Articles_and_Tips": require("./assets/screens/11.2.1_-_A_-_Articles_and_Tips.webp"),
  "11.2.1_-_B_-_Articles_and_Tips": require("./assets/screens/11.2.1_-_B_-_Articles_and_Tips.webp"),
  "11.2_-_A_-_Workout_Videos": require("./assets/screens/11.2_-_A_-_Workout_Videos.webp"),
  "11.2_-_B_-_Workout_Videos": require("./assets/screens/11.2_-_B_-_Workout_Videos.webp"),
  "11.2_-_C_-_Workout_Videos": require("./assets/screens/11.2_-_C_-_Workout_Videos.webp"),
  "11.3.1_-_A_-_Favoritess": require("./assets/screens/11.3.1_-_A_-_Favoritess.webp"),
  "11.3.2_-_A-_Favorites_-_Video": require("./assets/screens/11.3.2_-_A-_Favorites_-_Video.webp"),
  "11.3.3_-_A-_Favorites_-_articles": require("./assets/screens/11.3.3_-_A-_Favorites_-_articles.webp"),
  "11.4.1_-A-_Help_Center": require("./assets/screens/11.4.1_-A-_Help_Center.webp"),
  "11.4.1_-_B_-_Help_and_FAQs": require("./assets/screens/11.4.1_-_B_-_Help_and_FAQs.webp"),
  "11.4.1_-_C_-_Customer_Service": require("./assets/screens/11.4.1_-_C_-_Customer_Service.webp"),
  "11.4.2_-_A-_Online_support": require("./assets/screens/11.4.2_-_A-_Online_support.webp"),
  "1_-_A_-_Launch": require("./assets/screens/1_-_A_-_Launch.webp"),
  "2_-_A_-_On_boarding": require("./assets/screens/2_-_A_-_On_boarding.webp"),
  "2_-_B_-_On_boarding": require("./assets/screens/2_-_B_-_On_boarding.webp"),
  "2_-_C_-_On_boarding": require("./assets/screens/2_-_C_-_On_boarding.webp"),
  "2_-_D_-_On_boarding": require("./assets/screens/2_-_D_-_On_boarding.webp"),
  "3.1_-_A_-_Forgotten_Password": require("./assets/screens/3.1_-_A_-_Forgotten_Password.webp"),
  "3.1_-_B_-_Set_Password": require("./assets/screens/3.1_-_B_-_Set_Password.webp"),
  "3.1_-_C_-_Set_Your_Fingerprint": require("./assets/screens/3.1_-_C_-_Set_Your_Fingerprint.webp"),
  "3_-_A_-_Log_In": require("./assets/screens/3_-_A_-_Log_In.webp"),
  "3_-_B_-_Sign_Up": require("./assets/screens/3_-_B_-_Sign_Up.webp"),
  "4.1_-_A_-_Gender": require("./assets/screens/4.1_-_A_-_Gender.webp"),
  "4.2_-_A_-_How_old": require("./assets/screens/4.2_-_A_-_How_old.webp"),
  "4.3_-_A_-_Weight": require("./assets/screens/4.3_-_A_-_Weight.webp"),
  "4.4_-_A_-_Height": require("./assets/screens/4.4_-_A_-_Height.webp"),
  "4.5_-_A_-_Goal": require("./assets/screens/4.5_-_A_-_Goal.webp"),
  "4.6_-_A_-_Physical_activity_level": require("./assets/screens/4.6_-_A_-_Physical_activity_level.webp"),
  "4.7_-_A_-_Fill_yopur_profile": require("./assets/screens/4.7_-_A_-_Fill_yopur_profile.webp"),
  "4_-_A_-_Set_Up": require("./assets/screens/4_-_A_-_Set_Up.webp"),
  "5_-_A_-_Home": require("./assets/screens/5_-_A_-_Home.webp"),
  "6.1.2_-_A_-_Favoritess": require("./assets/screens/6.1.2_-_A_-_Favoritess.webp"),
  "6.1.2_-_B-_Favorites_-_Video": require("./assets/screens/6.1.2_-_B-_Favorites_-_Video.webp"),
  "6.1.2_-_B-_Favorites_-_articles": require("./assets/screens/6.1.2_-_B-_Favorites_-_articles.webp"),
  "6.1.3_-_A-_Settings": require("./assets/screens/6.1.3_-_A-_Settings.webp"),
  "6.1.3_-_B-_Notifications_Settings": require("./assets/screens/6.1.3_-_B-_Notifications_Settings.webp"),
  "6.1.3_-_C-_Password_Settings": require("./assets/screens/6.1.3_-_C-_Password_Settings.webp"),
  "6.1.4_-_A-_Help_and_FAQs": require("./assets/screens/6.1.4_-_A-_Help_and_FAQs.webp"),
  "6.1.4_-_B-_Help_and_FAQs": require("./assets/screens/6.1.4_-_B-_Help_and_FAQs.webp"),
  "6.1._5-_A_-Log_Out": require("./assets/screens/6.1._5-_A_-Log_Out.webp"),
  "6.11_-_A_-_Profile": require("./assets/screens/6.11_-_A_-_Profile.webp"),
  "6.1_-_A_-_Profile": require("./assets/screens/6.1_-_A_-_Profile.webp"),
  "6.2.1_-_A_-_Notification_-_Workout_Reminders": require("./assets/screens/6.2.1_-_A_-_Notification_-_Workout_Reminders.webp"),
  "6.2.2_-_A_-_Notification_-_Workout_System": require("./assets/screens/6.2.2_-_A_-_Notification_-_Workout_System.webp"),
  "6.3.1_-_A_-_All_Search": require("./assets/screens/6.3.1_-_A_-_All_Search.webp"),
  "6.3.2_-_A_-_Workout_Search": require("./assets/screens/6.3.2_-_A_-_Workout_Search.webp"),
  "6.3.3_-_A_-_Nutrition_Search": require("./assets/screens/6.3.3_-_A_-_Nutrition_Search.webp"),
  "7.1.1.1_-_A_-_Beginner": require("./assets/screens/7.1.1.1_-_A_-_Beginner.webp"),
  "7.1.1.1_-_B_-_Create_your_own_routine": require("./assets/screens/7.1.1.1_-_B_-_Create_your_own_routine.webp"),
  "7.1.1.2_-_A_-_Intermediate": require("./assets/screens/7.1.1.2_-_A_-_Intermediate.webp"),
  "7.1.1.2_-_B_-_Intermediate": require("./assets/screens/7.1.1.2_-_B_-_Intermediate.webp"),
  "7.1.1.2_-_C_-_Intermediate": require("./assets/screens/7.1.1.2_-_C_-_Intermediate.webp"),
  "7.1.1.3_-_A_-_Advanced": require("./assets/screens/7.1.1.3_-_A_-_Advanced.webp"),
  "7.1.1.3_-_B_-_Advanced": require("./assets/screens/7.1.1.3_-_B_-_Advanced.webp"),
  "7.1.1.3_-_C_-_Advanced": require("./assets/screens/7.1.1.3_-_C_-_Advanced.webp"),
  "7.1.1_-_A_-_Beginner": require("./assets/screens/7.1.1_-_A_-_Beginner.webp"),
  "7.1.2_-_A_-_Create_your_own_routine": require("./assets/screens/7.1.2_-_A_-_Create_your_own_routine.webp"),
  "7.1.2_-_B_-_Create_your_own_routine": require("./assets/screens/7.1.2_-_B_-_Create_your_own_routine.webp"),
  "7.1.2_-_C_-_Create_your_own_routine": require("./assets/screens/7.1.2_-_C_-_Create_your_own_routine.webp"),
  "7.2.1_-_A_-_Workout_logs": require("./assets/screens/7.2.1_-_A_-_Workout_logs.webp"),
  "7.2.2_-_A_-_Progress_Tracking": require("./assets/screens/7.2.2_-_A_-_Progress_Tracking.webp"),
  "7.3.1_-B_-_Meal_Plans": require("./assets/screens/7.3.1_-B_-_Meal_Plans.webp"),
  "7.3.1_-_A_-_Meal_Plans": require("./assets/screens/7.3.1_-_A_-_Meal_Plans.webp"),
  "7.3.1_-_C_-_Meal_Plans": require("./assets/screens/7.3.1_-_C_-_Meal_Plans.webp"),
  "7.3.1_-_D_-_Meal_Plans": require("./assets/screens/7.3.1_-_D_-_Meal_Plans.webp"),
  "7.3.1_-_E_-_Meal_Plans": require("./assets/screens/7.3.1_-_E_-_Meal_Plans.webp"),
  "7.3.1_-_f_-_Meal_Plans": require("./assets/screens/7.3.1_-_f_-_Meal_Plans.webp"),
  "7.3.2.1_-_A_-_Meal_Plans_-_Breakfast": require("./assets/screens/7.3.2.1_-_A_-_Meal_Plans_-_Breakfast.webp"),
  "7.3.2.1_-_B_-_Meal_Plans_-_Breakfast": require("./assets/screens/7.3.2.1_-_B_-_Meal_Plans_-_Breakfast.webp"),
  "7.3.2.1_-_C_-_Meal_Plans_-_Breakfast": require("./assets/screens/7.3.2.1_-_C_-_Meal_Plans_-_Breakfast.webp"),
  "7.3.2.2_-_A_-_Meal_Plans_-_Lunch": require("./assets/screens/7.3.2.2_-_A_-_Meal_Plans_-_Lunch.webp"),
  "7.3.2.2_-_B_-_Meal_Plans_-_Lunch": require("./assets/screens/7.3.2.2_-_B_-_Meal_Plans_-_Lunch.webp"),
  "7.3.2.2_-_C_-_Meal_Plans_-_Lunch": require("./assets/screens/7.3.2.2_-_C_-_Meal_Plans_-_Lunch.webp"),
  "7.3.2.3_-_A_-_Meal_Plans_-_Dinner": require("./assets/screens/7.3.2.3_-_A_-_Meal_Plans_-_Dinner.webp"),
  "7.3.2.3_-_B_-_Meal_Plans_-_Dinner": require("./assets/screens/7.3.2.3_-_B_-_Meal_Plans_-_Dinner.webp"),
  "7.3.2.3_-_C_-_Meal_Plans_-_Dinner": require("./assets/screens/7.3.2.3_-_C_-_Meal_Plans_-_Dinner.webp"),
  "7.3.2_-A_-_Meal_Plans": require("./assets/screens/7.3.2_-A_-_Meal_Plans.webp"),
  "7.3_-_A_-_Nutrition": require("./assets/screens/7.3_-_A_-_Nutrition.webp"),
  "7.4.1_-_A_-_Discussion_Forum": require("./assets/screens/7.4.1_-_A_-_Discussion_Forum.webp"),
  "7.4.2_-_A_-_Challenge_andCompetitions": require("./assets/screens/7.4.2_-_A_-_Challenge_andCompetitions.webp"),
  "7.4.2_-_B_-_Challenge_andCompetitions": require("./assets/screens/7.4.2_-_B_-_Challenge_andCompetitions.webp"),
  "7.4.2_-_C_-_Challenge_andCompetitions": require("./assets/screens/7.4.2_-_C_-_Challenge_andCompetitions.webp"),
  "7.4.2_-_D_-_Challenge_andCompetitions": require("./assets/screens/7.4.2_-_D_-_Challenge_andCompetitions.webp"),
  "7.4_-_A_-_Community": require("./assets/screens/7.4_-_A_-_Community.webp"),
  "8_-_A_-_Recomendations": require("./assets/screens/8_-_A_-_Recomendations.webp"),
  "8_-_B_-_Dumbbell_Step_Up": require("./assets/screens/8_-_B_-_Dumbbell_Step_Up.webp"),
  "9_-_A_-_Weekly_Challenge": require("./assets/screens/9_-_A_-_Weekly_Challenge.webp"),
  "9_-_B_-_Weekly_Challenge": require("./assets/screens/9_-_B_-_Weekly_Challenge.webp"),
  "9_-_C_-_Weekly_Challenge": require("./assets/screens/9_-_C_-_Weekly_Challenge.webp"),
  "9_-_D_-_Weekly_Challenge": require("./assets/screens/9_-_D_-_Weekly_Challenge.webp"),
};

const STORAGE_KEY = "@fitbody_state_v2";

const DEFAULT_APP_STATE = {
  onboarded: false,
  loggedIn: false,
  profile: { fullName: "", email: "", phone: "" },
  favorites: [],
  completedWorkouts: 0,
  totalWorkoutSeconds: 0,
  workoutLogs: [],
  setup: { gender:"", age:"", weight:"", height:"", goal:"", activity:"" }
};

const HOME = "5_-_A_-_Home";
const BOTTOM_HOME = "11.1_-_A_-_Home";
const RESOURCES = "11.2_-_A_-_Workout_Videos";
const FAVORITES = "11.3.1_-_A_-_Favoritess";
const SUPPORT = "11.4.1_-A-_Help_Center";

const INTRO_FLOW = [
  "1_-_A_-_Launch",
  "2_-_A_-_On_boarding",
  "2_-_B_-_On_boarding",
  "2_-_C_-_On_boarding",
  "2_-_D_-_On_boarding",
  "3_-_A_-_Log_In",
];
const SETUP_FLOW = [
  "4_-_A_-_Set_Up",
  "4.1_-_A_-_Gender",
  "4.2_-_A_-_How_old",
  "4.3_-_A_-_Weight",
  "4.4_-_A_-_Height",
  "4.5_-_A_-_Goal",
  "4.6_-_A_-_Physical_activity_level",
  "4.7_-_A_-_Fill_yopur_profile",
  HOME,
];
const FORGOT_FLOW = [
  "3.1_-_A_-_Forgotten_Password",
  "3.1_-_B_-_Set_Password",
  "3.1_-_C_-_Set_Your_Fingerprint",
  "3_-_A_-_Log_In",
];

const GROUPS = {
  profile: ["6.1_-_A_-_Profile","6.11_-_A_-_Profile"],
  profileFavorites: ["6.1.2_-_A_-_Favoritess","6.1.2_-_B-_Favorites_-_Video","6.1.2_-_B-_Favorites_-_articles"],
  settings: ["6.1.3_-_A-_Settings","6.1.3_-_B-_Notifications_Settings","6.1.3_-_C-_Password_Settings"],
  profileHelp: ["6.1.4_-_A-_Help_and_FAQs","6.1.4_-_B-_Help_and_FAQs"],
  notifications: ["6.2.1_-_A_-_Notification_-_Workout_Reminders","6.2.2_-_A_-_Notification_-_Workout_System"],
  search: ["6.3.1_-_A_-_All_Search","6.3.2_-_A_-_Workout_Search","6.3.3_-_A_-_Nutrition_Search"],
  beginner: ["7.1.1_-_A_-_Beginner","7.1.1.1_-_A_-_Beginner","7.1.1.1_-_B_-_Create_your_own_routine"],
  intermediate: ["7.1.1.2_-_A_-_Intermediate","7.1.1.2_-_B_-_Intermediate","7.1.1.2_-_C_-_Intermediate"],
  advanced: ["7.1.1.3_-_A_-_Advanced","7.1.1.3_-_B_-_Advanced","7.1.1.3_-_C_-_Advanced"],
  routine: ["7.1.2_-_A_-_Create_your_own_routine","7.1.2_-_B_-_Create_your_own_routine","7.1.2_-_C_-_Create_your_own_routine"],
  progress: ["7.2.1_-_A_-_Workout_logs","7.2.2_-_A_-_Progress_Tracking"],
  mealIntro: ["7.3_-_A_-_Nutrition","7.3.1_-_A_-_Meal_Plans","7.3.1_-B_-_Meal_Plans","7.3.1_-_C_-_Meal_Plans","7.3.1_-_D_-_Meal_Plans","7.3.1_-_E_-_Meal_Plans","7.3.1_-_f_-_Meal_Plans","7.3.2_-A_-_Meal_Plans"],
  breakfast: ["7.3.2.1_-_A_-_Meal_Plans_-_Breakfast","7.3.2.1_-_B_-_Meal_Plans_-_Breakfast","7.3.2.1_-_C_-_Meal_Plans_-_Breakfast"],
  lunch: ["7.3.2.2_-_A_-_Meal_Plans_-_Lunch","7.3.2.2_-_B_-_Meal_Plans_-_Lunch","7.3.2.2_-_C_-_Meal_Plans_-_Lunch"],
  dinner: ["7.3.2.3_-_A_-_Meal_Plans_-_Dinner","7.3.2.3_-_B_-_Meal_Plans_-_Dinner","7.3.2.3_-_C_-_Meal_Plans_-_Dinner"],
  community: ["7.4_-_A_-_Community","7.4.1_-_A_-_Discussion_Forum"],
  challenges: ["7.4.2_-_A_-_Challenge_andCompetitions","7.4.2_-_B_-_Challenge_andCompetitions","7.4.2_-_C_-_Challenge_andCompetitions","7.4.2_-_D_-_Challenge_andCompetitions"],
  recommendations: ["8_-_A_-_Recomendations","8_-_B_-_Dumbbell_Step_Up"],
  weekly: ["9_-_A_-_Weekly_Challenge","9_-_B_-_Weekly_Challenge","9_-_C_-_Weekly_Challenge","9_-_D_-_Weekly_Challenge"],
  articleTips: ["10_-_A_-_Articles_and_Tips","10_-_B_-_Articles_and_Tips"],
  resourcesVideos: ["11.2_-_A_-_Workout_Videos","11.2_-_B_-_Workout_Videos","11.2_-_C_-_Workout_Videos"],
  resourcesArticles: ["11.2.1_-_A_-_Articles_and_Tips","11.2.1_-_B_-_Articles_and_Tips"],
  bottomFavorites: ["11.3.1_-_A_-_Favoritess","11.3.2_-_A-_Favorites_-_Video","11.3.3_-_A-_Favorites_-_articles"],
  support: ["11.4.1_-A-_Help_Center","11.4.1_-_B_-_Help_and_FAQs","11.4.1_-_C_-_Customer_Service","11.4.2_-_A-_Online_support"],
};

const QA_SECTIONS = [
  ["Home", HOME], ["Profile", GROUPS.profile[0]], ["Notifications", GROUPS.notifications[0]],
  ["Search", GROUPS.search[0]], ["Beginner", GROUPS.beginner[0]], ["Intermediate", GROUPS.intermediate[0]],
  ["Advanced", GROUPS.advanced[0]], ["Create Routine", GROUPS.routine[0]], ["Progress", GROUPS.progress[0]],
  ["Nutrition", GROUPS.mealIntro[0]], ["Breakfast", GROUPS.breakfast[0]], ["Lunch", GROUPS.lunch[0]],
  ["Dinner", GROUPS.dinner[0]], ["Community", GROUPS.community[0]], ["Challenges", GROUPS.challenges[0]],
  ["Recommendations", GROUPS.recommendations[0]], ["Weekly Challenge", GROUPS.weekly[0]],
  ["Articles & Tips", GROUPS.articleTips[0]], ["Resources", RESOURCES], ["Favorites", FAVORITES], ["Support", SUPPORT],
];

const ALL_SCREEN_KEYS = Object.keys(SCREENS);

function Hotspot({scale,x,y,w,h,onPress,onLongPress}){
  return <Pressable onPress={onPress} onLongPress={onLongPress}
    style={{position:"absolute",left:x*scale,top:y*scale,width:w*scale,height:h*scale}} />;
}
function Field({scale,x,y,w,h,value,onChangeText,secure=false,keyboardType="default",multiline=false}){
  return <TextInput value={value} onChangeText={onChangeText} secureTextEntry={secure} keyboardType={keyboardType}
    multiline={multiline} autoCapitalize="none" placeholderTextColor="transparent"
    style={{position:"absolute",left:x*scale,top:y*scale,width:w*scale,height:h*scale,paddingHorizontal:10*scale,
      fontSize:14*scale,color:"#222",backgroundColor:"rgba(255,255,255,0.001)"}}/>;
}
function groupOf(screen){
  for(const arr of Object.values(GROUPS)) if(arr.includes(screen)) return arr;
  return null;
}

export default function App(){
  const [screen,setScreen]=useState("1_-_A_-_Launch");
  const [hydrated,setHydrated]=useState(false);
  const [history,setHistory]=useState([]);
  const [renderW,setRenderW]=useState(393);
  const [menu,setMenu]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [fullName,setFullName]=useState("");
  const [phone,setPhone]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [appState,setAppState]=useState(DEFAULT_APP_STATE);
  const [workoutSeconds,setWorkoutSeconds]=useState(0);
  const timerRef=useRef(null);
  const [search,setSearch]=useState("");
  const [chat,setChat]=useState("");
  const [isVideoPlaying,setVideoPlaying]=useState(false);
  const [workoutStarted,setWorkoutStarted]=useState(false);
  const [favorite,setFavorite]=useState(false);
  const [chatMessages,setChatMessages]=useState([]);
  const [profileDraft,setProfileDraft]=useState({fullName:"",email:"",phone:""});
  const [setupToast,setSetupToast]=useState("");

  useEffect(()=>{
    (async()=>{
      try{
        const raw=await AsyncStorage.getItem(STORAGE_KEY);
        if(raw){
          const saved={...DEFAULT_APP_STATE,...JSON.parse(raw)};
          setAppState(saved);
          setFullName(saved.profile?.fullName || "");
          setEmail(saved.profile?.email || "");
          setPhone(saved.profile?.phone || "");
          setProfileDraft({fullName:saved.profile?.fullName || "",email:saved.profile?.email || "",phone:saved.profile?.phone || ""});
          setScreen(saved.loggedIn ? HOME : (saved.onboarded ? "3_-_A_-_Log_In" : "1_-_A_-_Launch"));
        }
      }catch(e){}
      setHydrated(true);
    })();
    return ()=>{ if(timerRef.current) clearInterval(timerRef.current); };
  },[]);

  useEffect(()=>{
    if(!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(appState)).catch(()=>{});
  },[appState,hydrated]);

  useEffect(()=>{
    if(workoutStarted){
      timerRef.current=setInterval(()=>setWorkoutSeconds(s=>s+1),1000);
    }else if(timerRef.current){
      clearInterval(timerRef.current); timerRef.current=null;
    }
    return ()=>{ if(timerRef.current){clearInterval(timerRef.current);timerRef.current=null;} };
  },[workoutStarted]);

  const finishWorkout=()=>{
    const duration=Math.max(1,workoutSeconds);
    const log={id:Date.now(),screen,duration,completedAt:new Date().toISOString()};
    setWorkoutStarted(false);
    setAppState(s=>({...s,completedWorkouts:s.completedWorkouts+1,totalWorkoutSeconds:s.totalWorkoutSeconds+duration,workoutLogs:[log,...(s.workoutLogs||[])].slice(0,100)}));
    setWorkoutSeconds(0);
    Alert.alert("Workout completed","Saved to your progress history.");
  };

  const login=()=>{
    const clean=email.trim();
    if(!clean || !clean.includes("@")) return Alert.alert("Email required","Please enter a valid email address.");
    if(password.length<4) return Alert.alert("Password required","Please enter your password.");
    setAppState(s=>({...s,loggedIn:true,onboarded:true,profile:{...s.profile,email:clean}}));
    setHistory([]);
    setScreen(HOME);
  };

  const signup=()=>{
    if(fullName.trim().length<2) return Alert.alert("Name required","Please enter your full name.");
    if(!phone.trim()) return Alert.alert("Mobile required","Please enter your mobile number.");
    if(password.length<6) return Alert.alert("Password too short","Use at least 6 characters.");
    if(password!==confirmPassword) return Alert.alert("Passwords do not match","Please confirm the same password.");
    setAppState(s=>({...s,onboarded:true,loggedIn:true,profile:{fullName:fullName.trim(),email:s.profile?.email||"",phone:phone.trim()}}));
    setHistory([]);
    setScreen(SETUP_FLOW[0]);
  };

  const toggleFavorite=()=>{
    const id=screen;
    setAppState(s=>{
      const exists=s.favorites.includes(id);
      return {...s,favorites:exists?s.favorites.filter(x=>x!==id):[...s.favorites,id]};
    });
    setFavorite(v=>!v);
  };

  const sendChat=()=>{
    const msg=chat.trim();
    if(!msg) return;
    setChatMessages(m=>[...m,{id:Date.now(),text:msg,from:"me"}]);
    setChat("");
    setTimeout(()=>setChatMessages(m=>[...m,{id:Date.now()+1,text:"Thanks — your message has been received. FitBody support is here to help.",from:"support"}]),350);
  };

  const setSetupValue=(key,value)=>{setAppState(s=>({...s,setup:{...s.setup,[key]:value}}));setSetupToast(value);setTimeout(()=>setSetupToast(""),800);};
  const saveProfile=()=>{const next={fullName:profileDraft.fullName.trim(),email:profileDraft.email.trim(),phone:profileDraft.phone.trim()};if(next.fullName.length<2)return Alert.alert("Profile","Please enter your name.");setAppState(s=>({...s,profile:next}));setFullName(next.fullName);setEmail(next.email);setPhone(next.phone);Alert.alert("Saved","Profile updated.");};
  const src=SCREENS[screen] || SCREENS[HOME];
  const info=Image.resolveAssetSource(src);
  const baseW=info?.width || 393, baseH=info?.height || 852;
  const scale=renderW/baseW, renderH=baseH*scale;
  const grp=groupOf(screen);

  const go=(target)=>{
    if(!SCREENS[target] || target===screen) return;
    setHistory(h=>[...h,screen]); setScreen(target); setVideoPlaying(false); setWorkoutStarted(false);
  };
  const back=()=>setHistory(h=>{ if(!h.length) return h; const c=[...h]; const t=c.pop(); setScreen(t); return c; });
  const next=(arr)=>{ const i=arr.indexOf(screen); if(i>=0 && i<arr.length-1) go(arr[i+1]); };

  const isIntro=INTRO_FLOW.includes(screen);
  const isSetup=SETUP_FLOW.includes(screen);
  const mainScreen = !isIntro && !isSetup && !FORGOT_FLOW.includes(screen) && screen!=="3_-_B_-_Sign_Up";

  const overlays=[];

  // Launch + onboarding
  if(screen==="1_-_A_-_Launch") overlays.push(<Hotspot key="launch" scale={scale} x={0} y={0} w={393} h={852} onPress={()=>go(INTRO_FLOW[1])}/>);
  if(screen.startsWith("2_-")){
    const i=INTRO_FLOW.indexOf(screen);
    overlays.push(<Hotspot key="onNext" scale={scale} x={70} y={495} w={260} h={120} onPress={()=>{const t=INTRO_FLOW[i+1]; if(t==="3_-_A_-_Log_In") setAppState(s=>({...s,onboarded:true})); go(t)}}/>);
    overlays.push(<Hotspot key="onSkip" scale={scale} x={285} y={45} w={100} h={70} onPress={()=>{setAppState(s=>({...s,onboarded:true}));go("3_-_A_-_Log_In")}}/>);
  }

  // Login
  if(screen==="3_-_A_-_Log_In"){
    overlays.push(<Field key="e" scale={scale} x={41} y={377} w={311} h={45} value={email} onChangeText={setEmail} keyboardType="email-address"/>);
    overlays.push(<Field key="p" scale={scale} x={41} y={465} w={311} h={45} value={password} onChangeText={setPassword} secure/>);
    overlays.push(<Hotspot key="forgot" scale={scale} x={215} y={505} w={170} h={70} onPress={()=>go(FORGOT_FLOW[0])}/>);
    overlays.push(<Hotspot key="login" scale={scale} x={88} y={575} w={220} h={90} onPress={login}/>);
    overlays.push(<Hotspot key="signup" scale={scale} x={45} y={755} w={305} h={80} onPress={()=>go("3_-_B_-_Sign_Up")}/>);
  }
  if(screen==="3_-_B_-_Sign_Up"){
    overlays.push(<Field key="name" scale={scale} x={41} y={242} w={311} h={45} value={fullName} onChangeText={setFullName}/>);
    overlays.push(<Field key="phone" scale={scale} x={41} y={330} w={311} h={45} value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>);
    overlays.push(<Field key="pw" scale={scale} x={41} y={418} w={311} h={45} value={password} onChangeText={setPassword} secure/>);
    overlays.push(<Field key="cpw" scale={scale} x={41} y={506} w={311} h={45} value={confirmPassword} onChangeText={setConfirmPassword} secure/>);
    overlays.push(<Hotspot key="sign" scale={scale} x={95} y={635} w={205} h={85} onPress={signup}/>);
    overlays.push(<Hotspot key="loginlink" scale={scale} x={45} y={775} w={305} h={70} onPress={()=>go("3_-_A_-_Log_In")}/>);
  }

  // forgot flow
  if(FORGOT_FLOW.includes(screen)){
    const i=FORGOT_FLOW.indexOf(screen);
    if(screen===FORGOT_FLOW[0]) overlays.push(<Field key="fe" scale={scale} x={41} y={384} w={311} h={45} value={email} onChangeText={setEmail} keyboardType="email-address"/>);
    if(screen===FORGOT_FLOW[1]) overlays.push(<Field key="fp" scale={scale} x={41} y={390} w={311} h={45} value={password} onChangeText={setPassword} secure/>);
    overlays.push(<Hotspot key="fnext" scale={scale} x={70} y={500} w={255} h={180} onPress={()=>go(FORGOT_FLOW[Math.min(i+1,FORGOT_FLOW.length-1)])}/>);
  }

  // setup questionnaire
  if(SETUP_FLOW.includes(screen) && screen!==HOME){
    const i=SETUP_FLOW.indexOf(screen);
    overlays.push(<Hotspot key="setupBack" scale={scale} x={10} y={35} w={70} h={90} onPress={back}/>);
    overlays.push(<Hotspot key="setupMain" scale={scale} x={20} y={150} w={353} h={520} onPress={()=>{}}/>);
    overlays.push(<Hotspot key="setupNext" scale={scale} x={55} y={665} w={285} h={155} onPress={()=>{if(screen==="4.7_-_A_-_Fill_yopur_profile"){setAppState(s=>({...s,loggedIn:true,onboarded:true,profile:{fullName:fullName||s.profile.fullName,email:email||s.profile.email,phone:phone||s.profile.phone}}));} go(SETUP_FLOW[i+1])}}/>);
  }

  if(screen==="4.1_-_A_-_Gender"){overlays.push(<Hotspot key="male" scale={scale} x={30} y={210} w={155} h={320} onPress={()=>setSetupValue("gender","Male")}/>);overlays.push(<Hotspot key="female" scale={scale} x={205} y={210} w={155} h={320} onPress={()=>setSetupValue("gender","Female")}/>);}
  if(screen==="4.2_-_A_-_How_old") overlays.push(<Hotspot key="agepick" scale={scale} x={20} y={215} w={353} h={390} onPress={()=>setSetupValue("age","25")}/>);
  if(screen==="4.3_-_A_-_Weight") overlays.push(<Hotspot key="weightpick" scale={scale} x={20} y={215} w={353} h={390} onPress={()=>setSetupValue("weight","70 kg")}/>);
  if(screen==="4.4_-_A_-_Height") overlays.push(<Hotspot key="heightpick" scale={scale} x={20} y={215} w={353} h={390} onPress={()=>setSetupValue("height","175 cm")}/>);
  if(screen==="4.5_-_A_-_Goal"){overlays.push(<Hotspot key="g1" scale={scale} x={20} y={170} w={353} h={120} onPress={()=>setSetupValue("goal","Lose weight")}/>);overlays.push(<Hotspot key="g2" scale={scale} x={20} y={295} w={353} h={120} onPress={()=>setSetupValue("goal","Improve fitness")}/>);overlays.push(<Hotspot key="g3" scale={scale} x={20} y={420} w={353} h={120} onPress={()=>setSetupValue("goal","Build muscle")}/>);}
  if(screen==="4.6_-_A_-_Physical_activity_level"){overlays.push(<Hotspot key="a1" scale={scale} x={20} y={180} w={353} h={125} onPress={()=>setSetupValue("activity","Light")}/>);overlays.push(<Hotspot key="a2" scale={scale} x={20} y={310} w={353} h={125} onPress={()=>setSetupValue("activity","Moderate")}/>);overlays.push(<Hotspot key="a3" scale={scale} x={20} y={440} w={353} h={125} onPress={()=>setSetupValue("activity","Very active")}/>);}

  // Home architecture
  if(screen===HOME){
    overlays.push(<Hotspot key="search" scale={scale} x={250} y={35} w={50} h={80} onPress={()=>go(GROUPS.search[0])}/>);
    overlays.push(<Hotspot key="notif" scale={scale} x={297} y={35} w={45} h={80} onPress={()=>go(GROUPS.notifications[0])}/>);
    overlays.push(<Hotspot key="profile" scale={scale} x={337} y={35} w={50} h={80} onPress={()=>go(GROUPS.profile[0])} onLongPress={()=>setMenu(true)}/>);
    overlays.push(<Hotspot key="workout" scale={scale} x={15} y={110} w={90} h={90} onPress={()=>go(GROUPS.beginner[0])}/>);
    overlays.push(<Hotspot key="progress" scale={scale} x={105} y={110} w={90} h={90} onPress={()=>go(GROUPS.progress[0])}/>);
    overlays.push(<Hotspot key="nutrition" scale={scale} x={195} y={110} w={90} h={90} onPress={()=>go(GROUPS.mealIntro[0])}/>);
    overlays.push(<Hotspot key="community" scale={scale} x={285} y={110} w={90} h={90} onPress={()=>go(GROUPS.community[0])}/>);
    overlays.push(<Hotspot key="recommend" scale={scale} x={20} y={200} w={353} h={185} onPress={()=>go(GROUPS.recommendations[0])}/>);
    overlays.push(<Hotspot key="weekly" scale={scale} x={20} y={385} w={353} h={190} onPress={()=>go(GROUPS.weekly[0])}/>);
    overlays.push(<Hotspot key="tips" scale={scale} x={20} y={575} w={353} h={205} onPress={()=>go(GROUPS.articleTips[0])}/>);
  }

  // profile menu
  if(screen===GROUPS.profile[1]){overlays.push(<Field key="pname" scale={scale} x={40} y={305} w={310} h={50} value={profileDraft.fullName} onChangeText={v=>setProfileDraft(p=>({...p,fullName:v}))}/>);overlays.push(<Field key="pemail" scale={scale} x={40} y={390} w={310} h={50} value={profileDraft.email} onChangeText={v=>setProfileDraft(p=>({...p,email:v}))} keyboardType="email-address"/>);overlays.push(<Field key="pphone" scale={scale} x={40} y={475} w={310} h={50} value={profileDraft.phone} onChangeText={v=>setProfileDraft(p=>({...p,phone:v}))} keyboardType="phone-pad"/>);overlays.push(<Hotspot key="psave" scale={scale} x={65} y={610} w={265} h={110} onPress={saveProfile}/>);}
  if(screen===GROUPS.profile[0]){
    overlays.push(<Hotspot key="edit" scale={scale} x={15} y={250} w={360} h={100} onPress={()=>go(GROUPS.profile[1])}/>);
    overlays.push(<Hotspot key="pfav" scale={scale} x={15} y={350} w={360} h={75} onPress={()=>go(GROUPS.profileFavorites[0])}/>);
    overlays.push(<Hotspot key="pset" scale={scale} x={15} y={500} w={360} h={75} onPress={()=>go(GROUPS.settings[0])}/>);
    overlays.push(<Hotspot key="phelp" scale={scale} x={15} y={575} w={360} h={75} onPress={()=>go(GROUPS.profileHelp[0])}/>);
    overlays.push(<Hotspot key="logout" scale={scale} x={15} y={650} w={360} h={95} onPress={()=>go("6.1._5-_A_-Log_Out")}/>);
  }
  if(screen==="6.1._5-_A_-Log_Out"){
    overlays.push(<Hotspot key="no" scale={scale} x={30} y={430} w={160} h={110} onPress={back}/>);
    overlays.push(<Hotspot key="yes" scale={scale} x={200} y={430} w={160} h={110} onPress={()=>{setAppState(s=>({...s,loggedIn:false}));setHistory([]);setScreen("3_-_A_-_Log_In")}}/>);
  }

  // profile favorites tabs
  if(GROUPS.profileFavorites.includes(screen)){
    overlays.push(<Hotspot key="pfa" scale={scale} x={20} y={95} w={115} h={70} onPress={()=>go(GROUPS.profileFavorites[0])}/>);
    overlays.push(<Hotspot key="pfv" scale={scale} x={135} y={95} w={120} h={70} onPress={()=>go(GROUPS.profileFavorites[1])}/>);
    overlays.push(<Hotspot key="pfar" scale={scale} x={255} y={95} w={120} h={70} onPress={()=>go(GROUPS.profileFavorites[2])}/>);
  }

  // settings
  if(screen===GROUPS.settings[0]){
    overlays.push(<Hotspot key="snot" scale={scale} x={15} y={130} w={360} h={115} onPress={()=>go(GROUPS.settings[1])}/>);
    overlays.push(<Hotspot key="spass" scale={scale} x={15} y={245} w={360} h={115} onPress={()=>go(GROUPS.settings[2])}/>);
  }

  // notifications + search tabs
  if(GROUPS.notifications.includes(screen)){
    overlays.push(<Hotspot key="nr" scale={scale} x={20} y={95} w={175} h={70} onPress={()=>go(GROUPS.notifications[0])}/>);
    overlays.push(<Hotspot key="ns" scale={scale} x={198} y={95} w={175} h={70} onPress={()=>go(GROUPS.notifications[1])}/>);
  }
  if(GROUPS.search.includes(screen)){
    overlays.push(<Field key="searchField" scale={scale} x={35} y={105} w={320} h={50} value={search} onChangeText={setSearch}/>);
    overlays.push(<Hotspot key="all" scale={scale} x={20} y={160} w={115} h={65} onPress={()=>go(GROUPS.search[0])}/>);
    overlays.push(<Hotspot key="wo" scale={scale} x={135} y={160} w={120} h={65} onPress={()=>go(GROUPS.search[1])}/>);
    overlays.push(<Hotspot key="nu" scale={scale} x={255} y={160} w={120} h={65} onPress={()=>go(GROUPS.search[2])}/>);
  }

  // workout tabs + detail progress
  const workoutAll=[...GROUPS.beginner,...GROUPS.intermediate,...GROUPS.advanced];
  if(workoutAll.includes(screen)){
    overlays.push(<Hotspot key="b" scale={scale} x={20} y={90} w={115} h={70} onPress={()=>go(GROUPS.beginner[0])}/>);
    overlays.push(<Hotspot key="i" scale={scale} x={135} y={90} w={120} h={70} onPress={()=>go(GROUPS.intermediate[0])}/>);
    overlays.push(<Hotspot key="a" scale={scale} x={255} y={90} w={120} h={70} onPress={()=>go(GROUPS.advanced[0])}/>);
    if(grp) overlays.push(<Hotspot key="detail" scale={scale} x={15} y={160} w={363} h={610} onPress={()=>next(grp)}/>);
  }
  if(screen===GROUPS.beginner[0]) overlays.push(<Hotspot key="routineShortcut" scale={scale} x={15} y={620} w={363} h={150} onLongPress={()=>go(GROUPS.routine[0])} onPress={()=>go(GROUPS.beginner[1])}/>);
  if(GROUPS.routine.includes(screen)) overlays.push(<Hotspot key="routineNext" scale={scale} x={15} y={130} w={363} h={650} onPress={()=>next(GROUPS.routine)}/>);

  // progress tabs
  if(GROUPS.progress.includes(screen)){
    overlays.push(<Hotspot key="plog" scale={scale} x={20} y={95} w={175} h={70} onPress={()=>go(GROUPS.progress[0])}/>);
    overlays.push(<Hotspot key="pchart" scale={scale} x={198} y={95} w={175} h={70} onPress={()=>go(GROUPS.progress[1])}/>);
  }

  // nutrition flows
  if(screen===GROUPS.mealIntro[0]) overlays.push(<Hotspot key="mealStart" scale={scale} x={15} y={135} w={363} h={630} onPress={()=>go(GROUPS.mealIntro[1])}/>);
  if(GROUPS.mealIntro.includes(screen) && screen!==GROUPS.mealIntro[0] && screen!==GROUPS.mealIntro.at(-1)) overlays.push(<Hotspot key="mealNext" scale={scale} x={15} y={130} w={363} h={650} onPress={()=>next(GROUPS.mealIntro)}/>);
  if(screen===GROUPS.mealIntro.at(-1)){
    overlays.push(<Hotspot key="break" scale={scale} x={15} y={120} w={363} h={210} onPress={()=>go(GROUPS.breakfast[0])}/>);
    overlays.push(<Hotspot key="lunch" scale={scale} x={15} y={330} w={363} h={210} onPress={()=>go(GROUPS.lunch[0])}/>);
    overlays.push(<Hotspot key="dinner" scale={scale} x={15} y={540} w={363} h={220} onPress={()=>go(GROUPS.dinner[0])}/>);
  }
  for(const mg of [GROUPS.breakfast,GROUPS.lunch,GROUPS.dinner]) if(mg.includes(screen)) overlays.push(<Hotspot key={mg[0]} scale={scale} x={15} y={120} w={363} h={650} onPress={()=>next(mg)}/>);

  // community
  if(screen===GROUPS.community[0]){
    overlays.push(<Hotspot key="forum" scale={scale} x={15} y={130} w={363} h={290} onPress={()=>go(GROUPS.community[1])}/>);
    overlays.push(<Hotspot key="challenge" scale={scale} x={15} y={420} w={363} h={340} onPress={()=>go(GROUPS.challenges[0])}/>);
  }
  if(GROUPS.challenges.includes(screen)) overlays.push(<Hotspot key="challNext" scale={scale} x={15} y={120} w={363} h={660} onPress={()=>next(GROUPS.challenges)}/>);

  // recommendations / weekly / articles sequential
  for(const seq of [GROUPS.recommendations,GROUPS.weekly,GROUPS.articleTips]) if(seq.includes(screen)) overlays.push(<Hotspot key={seq[0]} scale={scale} x={15} y={120} w={363} h={660} onPress={()=>next(seq)}/>);

  // resources
  if(screen===RESOURCES){
    overlays.push(<Hotspot key="ra" scale={scale} x={15} y={130} w={363} h={300} onPress={()=>go(GROUPS.resourcesArticles[0])}/>);
    overlays.push(<Hotspot key="rv" scale={scale} x={15} y={430} w={363} h={330} onPress={()=>go(GROUPS.resourcesVideos[1])}/>);
  }
  if(GROUPS.resourcesVideos.includes(screen) && screen!==RESOURCES) overlays.push(<Hotspot key="rvn" scale={scale} x={15} y={120} w={363} h={650} onPress={()=>next(GROUPS.resourcesVideos)}/>);
  if(GROUPS.resourcesArticles.includes(screen)) overlays.push(<Hotspot key="ran" scale={scale} x={15} y={120} w={363} h={650} onPress={()=>next(GROUPS.resourcesArticles)}/>);

  // bottom favorites
  if(GROUPS.bottomFavorites.includes(screen)){
    overlays.push(<Hotspot key="ba" scale={scale} x={20} y={95} w={115} h={70} onPress={()=>go(GROUPS.bottomFavorites[0])}/>);
    overlays.push(<Hotspot key="bv" scale={scale} x={135} y={95} w={120} h={70} onPress={()=>go(GROUPS.bottomFavorites[1])}/>);
    overlays.push(<Hotspot key="bar" scale={scale} x={255} y={95} w={120} h={70} onPress={()=>go(GROUPS.bottomFavorites[2])}/>);
    overlays.push(<Hotspot key="favToggle" scale={scale} x={315} y={150} w={65} h={540} onPress={toggleFavorite}/>);
  }

  // support
  if(screen===SUPPORT){
    overlays.push(<Hotspot key="helpfaq" scale={scale} x={15} y={120} w={363} h={250} onPress={()=>go(GROUPS.support[1])}/>);
    overlays.push(<Hotspot key="customer" scale={scale} x={15} y={370} w={363} h={210} onPress={()=>go(GROUPS.support[2])}/>);
    overlays.push(<Hotspot key="online" scale={scale} x={15} y={580} w={363} h={190} onPress={()=>go(GROUPS.support[3])}/>);
  }
  if(screen===GROUPS.support[2]) overlays.push(<Hotspot key="toOnline" scale={scale} x={15} y={200} w={363} h={260} onPress={()=>go(GROUPS.support[3])}/>);
  if(screen===GROUPS.support[3]){
    overlays.push(<Field key="chat" scale={scale} x={67} y={710} w={220} h={48} value={chat} onChangeText={setChat}/>);
    overlays.push(<Hotspot key="send" scale={scale} x={288} y={705} w={75} h={65} onPress={sendChat}/>);
  }

  // Workout/video action states for detailed screens
  const detailScreens=[GROUPS.beginner[2],GROUPS.intermediate[2],GROUPS.advanced[2],GROUPS.resourcesVideos[1],GROUPS.resourcesVideos[2],"8_-_B_-_Dumbbell_Step_Up"];
  if(detailScreens.includes(screen)){
    overlays.push(<Hotspot key="play" scale={scale} x={65} y={180} w={265} h={330} onPress={()=>setVideoPlaying(v=>!v)}/>);
    overlays.push(<Hotspot key="start" scale={scale} x={55} y={610} w={285} h={120} onPress={()=>{if(workoutStarted) finishWorkout(); else {setWorkoutSeconds(0);setWorkoutStarted(true);}}}/>);
  }

  // universal back and bottom nav on main app screens
  if(mainScreen && screen!==HOME){
    overlays.push(<Hotspot key="universalBack" scale={scale} x={5} y={35} w={65} h={85} onPress={back}/>);
  }
  const bottomScreens = ALL_SCREEN_KEYS.filter(k => k.startsWith("11.") || k.startsWith("6.") || k.startsWith("7.") || k.startsWith("8_") || k.startsWith("9_") || k.startsWith("10_"));
  if(bottomScreens.includes(screen) || screen===HOME){
    const y=Math.max(0,baseH-72);
    overlays.push(<Hotspot key="bh" scale={scale} x={0} y={y} w={98} h={72} onPress={()=>go(BOTTOM_HOME)}/>);
    overlays.push(<Hotspot key="br" scale={scale} x={98} y={y} w={98} h={72} onPress={()=>go(RESOURCES)}/>);
    overlays.push(<Hotspot key="bf" scale={scale} x={196} y={y} w={98} h={72} onPress={()=>go(FAVORITES)}/>);
    overlays.push(<Hotspot key="bs" scale={scale} x={294} y={y} w={99} h={72} onPress={()=>go(SUPPORT)}/>);
  }
  if(screen===BOTTOM_HOME) overlays.push(<Hotspot key="bottomToMain" scale={scale} x={0} y={0} w={393} h={baseH-72} onLongPress={()=>go(HOME)} onPress={()=>{}}/>);

  if(!hydrated) return <View style={styles.loading}><Text style={styles.loadingText}>FITBODY</Text></View>;

  return <KeyboardAvoidingView style={styles.root} behavior={Platform.OS==="ios"?"padding":undefined} onLayout={e=>setRenderW(e.nativeEvent.layout.width)}>
    <StatusBar hidden />
    <ScrollView style={styles.scroll} contentContainerStyle={{minHeight:"100%"}} showsVerticalScrollIndicator={false} bounces={false}>
      <View style={{width:renderW,height:renderH,alignSelf:"center"}}>
        <Image source={src} style={{position:"absolute",width:renderW,height:renderH}} resizeMode="stretch"/>
        {overlays}
        {isVideoPlaying && <Pressable style={[styles.stateBadge,{top:190*scale,left:55*scale,width:283*scale}]} onPress={()=>setVideoPlaying(false)}>
          <Text style={styles.stateTitle}>▶ WORKOUT VIDEO UI ACTIVE</Text>
          <Text style={styles.stateText}>The supplied Figma source contains video-screen artwork only; no MP4/WebM file was included.</Text>
        </Pressable>}
        {workoutStarted && <Pressable onPress={finishWorkout} style={[styles.smallBadge,{bottom:95*scale,left:65*scale,width:263*scale}]}>
          <Text style={styles.smallBadgeText}>Workout active • {String(Math.floor(workoutSeconds/60)).padStart(2,"0")}:{String(workoutSeconds%60).padStart(2,"0")} • Tap to finish</Text>
        </Pressable>}
        {appState.favorites.includes(screen) && <View style={[styles.smallBadge,{top:115*scale,left:90*scale,width:213*scale}]}><Text style={styles.smallBadgeText}>Saved to favorites ★</Text></View>}
        {setupToast ? <View style={[styles.smallBadge,{top:115*scale,left:88*scale,width:217*scale}]}><Text style={styles.smallBadgeText}>Selected: {setupToast}</Text></View> : null}
        {screen===GROUPS.support[3] && chatMessages.length>0 && <View style={[styles.chatOverlay,{left:18*scale,right:18*scale,bottom:100*scale}]}>
          {chatMessages.slice(-3).map(m=><View key={m.id} style={[styles.chatBubble,m.from==="me"?styles.chatMine:styles.chatSupport]}><Text style={styles.chatText}>{m.text}</Text></View>)}
        </View>}
      </View>
    </ScrollView>

    <Modal visible={menu} transparent animationType="fade" onRequestClose={()=>setMenu(false)}>
      <Pressable style={styles.shade} onPress={()=>setMenu(false)}>
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>All Figma App Sections</Text>
          <Text style={styles.menuSub}>93 full Figma screens are bundled. Use this QA menu to jump to every branch.</Text>
          <ScrollView style={{maxHeight:560}}>
            {QA_SECTIONS.map(([label,target])=><TouchableOpacity key={label} style={styles.menuRow} onPress={()=>{setMenu(false);go(target)}}><Text style={styles.menuLabel}>{label}</Text><Text style={styles.arrow}>›</Text></TouchableOpacity>)}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  </KeyboardAvoidingView>;
}

const styles=StyleSheet.create({
  root:{flex:1,backgroundColor:"#1f1f1f"}, scroll:{flex:1,width:"100%"},
  qaButton:{position:"absolute",right:10,top:10,width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,.16)",alignItems:"center",justifyContent:"center"},
  qaText:{color:"rgba(255,255,255,.65)",fontSize:17,fontWeight:"800"},
  shade:{flex:1,backgroundColor:"rgba(0,0,0,.72)",alignItems:"center",justifyContent:"center",padding:20},
  menuCard:{width:"100%",maxWidth:390,backgroundColor:"#201f22",borderRadius:24,padding:20,borderWidth:1,borderColor:"#7860c8"},
  menuTitle:{fontSize:21,fontWeight:"900",color:"#e7ff55"}, menuSub:{fontSize:12,lineHeight:18,color:"#c8c3cc",marginTop:5,marginBottom:12},
  menuRow:{height:48,borderBottomWidth:1,borderBottomColor:"#3b3740",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  menuLabel:{fontSize:14,color:"white",fontWeight:"700"}, arrow:{fontSize:26,color:"#a98cf2"},
  stateBadge:{position:"absolute",backgroundColor:"rgba(15,15,15,.90)",padding:16,borderRadius:18,borderWidth:1,borderColor:"#dfff4f"},
  stateTitle:{color:"#dfff4f",fontWeight:"900",fontSize:14,textAlign:"center"}, stateText:{color:"white",fontSize:10,lineHeight:15,textAlign:"center",marginTop:5},
  smallBadge:{position:"absolute",backgroundColor:"rgba(20,20,20,.9)",padding:10,borderRadius:16}, smallBadgeText:{color:"white",fontWeight:"800",fontSize:12,textAlign:"center"},
  loading:{flex:1,backgroundColor:"#1f1f1f",alignItems:"center",justifyContent:"center"},loadingText:{color:"#dfff4f",fontSize:28,fontWeight:"900",letterSpacing:3},
  chatOverlay:{position:"absolute",gap:6},chatBubble:{maxWidth:"82%",paddingHorizontal:12,paddingVertical:8,borderRadius:14},chatMine:{alignSelf:"flex-end",backgroundColor:"rgba(126,89,214,.95)"},chatSupport:{alignSelf:"flex-start",backgroundColor:"rgba(35,35,35,.95)"},chatText:{color:"#fff",fontSize:11,lineHeight:15},
});