export default {  test: true,
  object: { test : 'yes' ,number : 2  } ,
  tendrill: {  app: {  views: {  engine: require('tenhub-server/views/Engine').default},
  connections: { main : { connector : require('tenhub-server/connectors/mongodb').connector ,options : { collection : 'websessions' ,autoRemove : 'interval' ,autoRemoveInterval : 60  }   }   } ,
  filters: {  session: {  enabled: true,
  options: { httpOnly : true  } }},
  modules: { www : require('lims/modules/www').default  } },
  filters: {  csrf: {  enabled: true}}}} 