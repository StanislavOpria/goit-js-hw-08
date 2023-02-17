import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const saveInLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadFromLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function getCurrentTime(event) {
  const carrentTime = event.seconds;
  saveInLocalStorage(LOCALSTORAGE_KEY, carrentTime);
  console.log(localStorage.getItem(LOCALSTORAGE_KEY));
}

player.on('timeupdate', getCurrentTime);
player.setCurrentTime(loadFromLocalStorage(LOCALSTORAGE_KEY));
