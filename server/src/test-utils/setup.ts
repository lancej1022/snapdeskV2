import { testConnection } from './testConnection';

// call the test connection to setup the DB and
// make sure to exit the process afterwards so node doesnt throw a fit
testConnection(true).then(() => process.exit());
