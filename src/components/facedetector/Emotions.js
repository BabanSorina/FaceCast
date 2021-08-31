
import { Podcast_Topics, defaultEmotion } from '../commons/PodcastTopics';

export default class EmotionsModel {
  constructor(props) {
    this.anger = props?.anger;// health and fitness(mental health)
    this.contempt = props?.contempt;//Religion & Spirituality , society & culture
    this.disgust = props?.disgust;//news, government,comedy
    this.fear = props?.fear; // news,true crime 
    this.happiness = props?.happiness;// music, leisure, comedy
    this.neutral = props?.neutral;// education, business, kids & familyaci pot pune ca orice
    this.sadness = props?.sadness;// home & gardening 
    this.surprise = props?.surprise;// tech news
    this.topics = props?.topics;
    this.getRecommendedPodcast=this.getRecommendedPodcast.bind(this);
  }



  getRecommendedPodcast() {

    emotion = this.getMax()// aleg cea mai mare emotie din lista de emotii 

    if (emotion === 'default') { // orice emotie <0
      console.log('nu are emotii');
      return defaultEmotion;
    }

    // verifica daca printre topicuri exista topicuri cu  emotia maxima 
    filteredPerson = this.topics.filter((personTopic) => {
      return personTopic.emotion === emotion // returneaza cand gaseste un topic cu emotia maxima 
    }) // aici imi da lista cu topicuri pe emotia maxima din persoana 

    if (filteredPerson.length !== 0) {
      const randomPlaylistIndex = Math.floor(Math.random() * filteredPerson.length); // ia un index random pentru lista de topicuri de mai sus 
      return filteredPerson[randomPlaylistIndex] //returneaza elementul random din lista de podcasturi filtrate
    } // daca nu exista emotia maxima in lista de topicuri

  //cauta in lista mare de playlisturi emotia maxima 
    filteredPlaylist = Podcast_Topics.filter((x) => {
      return x.emotion === emotion //returneaza 
    }) // daca nu a gasit emotia deloc in lista de podcasturi
    if (filteredPlaylist.length === 0) {
      return defaultEmotion
    }

    const randomPlaylistIndex = Math.floor(Math.random() * filteredPlaylist.length);
    return filteredPlaylist[randomPlaylistIndex] // returneaza un element random din lista de podcasturi mare

  }

  getMax() {
    const max = {
      value: -1,
      name: 'default'
    }
    const em = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surpise']; //lista de emotii posibile
    em.forEach((el) => { // treci prin lista de emotii posibile 
      if (this[el] > max.value) {
        max.value = this[el]
        max.name = el
      }
    })
    return max.name // returneaza numele emotii cele mai mari 
  }





}



