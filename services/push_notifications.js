import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

// Udemy push notification server.
// TODO: replace with my own notification server OR Firebase
const PUSH_ENDPOINT = 'https://rallycoding.herokuapp.com/api/tokens'

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  // output token to expo console, then head to PUSH_ENDPOINT and enter it there
  console.log(previousToken);
  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    let token = await Notifications.getExponentPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  }
};
