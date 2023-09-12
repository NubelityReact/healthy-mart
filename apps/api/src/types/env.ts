interface IEnvConfig {
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  jwt_secret: string;
}

export default IEnvConfig;
