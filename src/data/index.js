const videoA = {
  id: 'a',
  title: 'Create a Graphql Schema',
  duration: 120,
  watched: true
};

const videoB = {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched: false
};

const videos = [videoA, videoB];

const getVideoById = (id) => new Promise(
  (resolve) => {
    const [ video ] = videos.filter((v) => v.id === id);

    resolve(video);
  }
)

exports.getVideoById = getVideoById;