'use strict';

const express = require('express');
const graphHTTP = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');

const { getVideoById, getVideos } = require('./src/data');

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
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video'
        }
      },
      resolve: (_, args) => getVideoById(args.id)
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType
});

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

