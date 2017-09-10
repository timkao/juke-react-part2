import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class ArtistAlbums extends Component {
  render () {
    const albums = this.props.albums;
    console.log('artistAlbums!');
    return (
      <div>
      {
        albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
            <Link className="thumbnail" to={`/albums/${album.id}`}>
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    );
  }
}
