import React, { Component } from 'react';
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import Songs from './Songs'
import ArtistAlbums from './ArtistAlbums';

export default class SingleArtist extends Component {

  constructor() {
    super()
    this.state = {
      selectedArtist: {},
      albums: [],
      songs: []
    }
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId
    Promise.all([
      axios.get(`/api/artists/${artistId}`),
      axios.get(`/api/artists/${artistId}/albums`),
      axios.get(`/api/artists/${artistId}/songs`)
    ])
      .then(([ artistData, albumsData, songsData ]) => {
        this.setState({
          selectedArtist: artistData.data,
          albums: albumsData.data,
          songs: songsData.data
        })
      })
  }

  render () {
    const artist = this.state.selectedArtist;
    const albums = this.state.albums;
    const songs = this.state.songs;

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/artist-albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/artist-songs`}>SONGS</Link></li>
        </ul>

        <Route path={`/artists/${artist.id}/artist-albums`} render={ () => <ArtistAlbums albums={albums} /> } />
        <Route path={`/artists/${artist.id}/artist-songs`} render={ () => <Songs songs={songs} /> } />

      </div>
    );
  }

}
