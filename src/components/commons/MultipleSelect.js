import React, { useState } from 'react';
import { View ,StyleSheet} from 'react-native';
import { Box } from 'react-native-design-utility';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'
import {theme} from '../../constants/theme';

import { Podcast_Topics } from './PodcastTopics';

const MultipleSelectBox =({sendTopicsback}) =>{
  const [selectedTopics, setSelectedTopics] = useState([]);

  function onMultiChange() {
    return (item) => setSelectedTopics(xorBy(selectedTopics, [item], 'id'))
  };
  React.useEffect(() =>{sendTopicsback(selectedTopics);
    console.log(selectedTopics);}
    
  ,[selectedTopics]);
  return(
    <View >
     <SelectBox 
        label="Select multiple topics you are interested in  "
        labelStyle={styles.label}
        multiOptionContainerStyle={{backgroundColor:theme.color.africanviolet}}
        options={Podcast_Topics}
        selectedValues={selectedTopics}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    </View>
  )
}
export default MultipleSelectBox;

const styles=StyleSheet.create({
 label: {
  color:theme.color.purple,
  fontSize:20
 },
 
})