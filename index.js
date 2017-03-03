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

const { getVideoById, getVideos, createVideo } = require('./src/data');

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

const mutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root Mutation Type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The title of the video',
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The duration of the video(in seconds)',
        },
        released: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'Whether or not the video is released',
        },
      },
      resolve: (_, args) => createVideo(args)
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
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

