[![Code Climate](https://codeclimate.com/github/boennemann/badges.svg)](https://codeclimate.com/github/boennemann/badges) [![NPM version](https://badge.fury.io/js/badge-list.svg)](http://badge.fury.io/js/badge-list)

# ReflexiveJS #

This is a library for ORM (Database and object) interaction and extension for render object to view implement with Javascript.

## Requirement ##



1. [NodeJS](NodeJS "https://nodejs.org/en/") up to 6.0.0
2.  [ExpressJS](ExpressJS "http://expressjs.com/fr/") latest

## Dabatase Connector ##

Example connector implemented :

- PostgreSQL (feature)
- SQL Server
- MySQL (feature)

## Feature ##

Basic CRUD action implementation ( Create, update, delete ).
When object extends this framework, it automatically have the CRUD action function auto implemented
- **save()**
- **find()**
- **delete()**
- **update()**

However you can extend for Object render who've been implemented on this extension. But you can redefine these function

- **generateForm()**
- **renderObject()**

## Question? ##

Please ask questions on StackOverflow and be sure to include the parsley.js tag. Please provide an example, starting for example from this jsfiddle

## Install dev environment and running tests ##

Before using this framework, please make sure that:

> npm install

## Configuration ##

Configuration is set into folder 
> \rsj\config

You can set your personnalize connectionString.xml, project will load and read this file to boot database liability

## Run tests ##

In command line, type :

> npm start

And open in browser :

> http://localhost:3000/