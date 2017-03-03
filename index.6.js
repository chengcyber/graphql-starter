'use strict';

const express = require('express');
const graphHTTP = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const videoType = new GraphQLObjectType({
  name: 'VideoType',
  description: 'A Video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video(in seconds)',
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched this video',
    },
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 120,
          watched: false
        })
      })
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType
})

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

/**
 * express graphql
 */
const server = express();

const port = process.env.PORT || 3000;

server.use('/graphql', graphHTTP({
  schema,
  graphiql: true,
}));

server.listen(port, () => console.log(`Graphql Server running on ${port}`));

