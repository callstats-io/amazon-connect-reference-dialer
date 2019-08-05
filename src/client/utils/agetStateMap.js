import lo from 'lodash';

const colorSchema = {
  available: '#4393CA',
  init: '#4393CA',
  aftercallwork: '#666666',
  offline: '#666666',
  qualityissue: '#666666',
  connected: '#0f9a28',
  joined: '#0f9a28',
  onhold: '#e07724',
  hold: '#e07724',
  missed: '#F5A623',
  missedcall: '#F5A623',
  inboundcall: '#4393CA',
  incomingcall: '#4393CA',
  missedcallagent: '#F5A623',
  failedconnectcustomer: '#F5A623',
  failedconnectagent: '#F5A623',
  outboundcall: '#4393CA',
  default: '#666666',
  error: '#ffffff'
};

export const getColorSchema = (agentState) => {
  let state = lo.lowerCase(agentState).replace(/\s/g, '');
  let color = colorSchema[state];
  return color || colorSchema.default;
};

export const getMappedName = () => {

};
