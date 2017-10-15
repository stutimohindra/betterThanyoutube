import React,{Component} from 'react';
import _ from 'lodash'
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search'
const API_KEY = 'AIzaSyC8JgidLtteOSvQ_9JYzoluU6DZz8POj2o'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null,
     };
     this.videoSearch('dogs')
  }
  videoSearch(term) {
    YTSearch({  key: API_KEY,term:term},(videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    })
  }
  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)} ,300)
    return (
    <div>
      <SearchBar onSearchTermChange={ videoSearch } />
      <VideoDetail video = {this.state.selectedVideo}/>
      <VideoList
        onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
        videos = {this.state.videos}
      />
    </div>
  );
  }
}
ReactDom.render(<App/>,document.querySelector('.container'));
