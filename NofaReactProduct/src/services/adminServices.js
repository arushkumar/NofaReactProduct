import axios from 'axios';
import authHeader from './Header';
const API_URL_TEST = `${process.env.REACT_APP_URL}`+'api/test/';
const API_URL = `${process.env.REACT_APP_URL}`;
const API_LOCAL = 'localhost:8080/api/'
//const API_URL = 'http://10.8.0.5:8080/superNofaApi/api/test/';
const user = JSON.parse(sessionStorage.getItem('user'));
class UserService {

 
  getNofalineItemsType() {
    return axios.get(API_URL+"nofaApi/getNofaItemType",{ headers: authHeader()})
  }
  getQuestionType() {
    return axios.get(API_URL+"nofaApi/getQuestionType",{ headers: authHeader()})
  }

  getQuestion() {
    return axios.get(API_URL+"nofaApi/getQuestions" ,{ headers: authHeader()})
  }

  getNofa() {
    return axios.get(API_URL+"users/getNofa" , {headers: authHeader()})
  }
  getDateTest(datavalue) {
    return axios.get(API_URL+"nofaApi/getDateTest")
  }
  getNofatabs() {
    return axios.get(API_URL+"nofaApi/getNofaTab" ,{ headers: authHeader()})
  }

  createNofa(datavalue) {
    return axios.post(API_URL+"nofaApi/createNofa",datavalue ,{ headers: authHeader()})
     .then(responce =>{
         return responce.data
     })

  }  
  
  getAllDataByPartyIDIdAndRfpId(values) {
    return axios.post(API_URL + "users/getAllDataByPartyIDIdAndRfpId", values, { headers: authHeader() })
    .then(response => {
      return response.data;
    });
  }
  getCounty() {
    return axios.get(API_URL + "organization/getCounty", { headers: authHeader() })
  }
  getRfpId() {
    return axios.get(API_URL + "organization/getRfpId", { headers: authHeader() })
    .then(response => {
      return response.data;
    });
  }

  createApplicantOrg(values) {
    return axios.post(API_URL + "organization/createApplicantOrg", values, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }
  getOrganizationByNofaId(values) {
    return axios.post(API_URL + "organization/getOrganizationByNofaId", values, { headers: authHeader() })
  }

  createProgectBudget(values) {
    return axios.post(API_URL + "projectBudget/createProgectBudget", values, { headers: authHeader() })
  }
  createFundingProgram(values) {
    return axios.post(API_URL + "funding/createFundingProgram", values, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  createProjectManagement(values) {
    return axios.post(API_URL + "projectManagement/createProjectManagement", values, { headers: authHeader() })
  }
  createContact(values) {
    return axios.post(API_URL + "contact/createContact", values, { headers: authHeader() })
  }
  createCooperating(values) {
    return axios.post(API_URL + "cooperating/createCooperating", values, { headers: authHeader() })
  }

  createQuestionnaireAllRecord(values) {
    return axios.post(API_URL + "questionnaire/createQuestionnaireAllRecord", values, { headers: authHeader() })
  } 

  createQuestionnaire(values) {
    return axios.post(API_URL + "questionnaire/createQuestionnaire", values, { headers: authHeader() })
  }  

  updateQuestionnaire(values) {
    return axios.post(API_URL + "questionnaire/updateQuestionnaire", values, { headers: authHeader() })
  }
  getAllProjectContactbyRespID(values) {
    return axios.post(API_URL + "contact/getAllProjectContactbyRespID", values, { headers: authHeader() })
  }
  DeleteProjectContactbyPartyID(values) {
    return axios.post(API_URL + "contact/DeleteProjectContactbyPartyID", values, { headers: authHeader() })
  }
  getContAndCoopratingByPartyId(values) {
    return axios.post(API_URL + "contact/getContactandCoopratingDetailByPartyId", values, { headers: authHeader() })
  }

  getAllCoopratingContactbyRespID(values) {
    return axios.post(API_URL + "cooperating/getAllCoopratingContactbyRespID", values, { headers: authHeader() })
  }
  UpdatContactMechanisms(values) {
    return axios.post(API_URL + "projectManagement/UpdatContactMechanisms", values, { headers: authHeader() })
  }
  deleteRfpFundItem(values) {
    return axios.post(API_URL + "funding/deleteRfpFundItem", values, { headers: authHeader() })
    .then(response => {
      return response.data;
    });
  }
  getWaterBoardList() {
    return axios.get(API_URL + "organization/getWaterBoardName", { headers: authHeader() })
  }

  getSenateDistrict() {
    return axios.get(API_URL + "Legislatives/getSenateDistrict", { headers: authHeader() })
  }

  getAssemblyDistrict() {
    return axios.get(API_URL + "Legislatives/getAssemblyDistrict", { headers: authHeader() })
  }
  getUSCongressionalDistrict() {
    return axios.get(API_URL + "Legislatives/getUSCongressionalDistrict", { headers: authHeader() })
  }

  createRfpLegislativeInformation(values) {
    return axios.post(API_URL + "Legislatives/createRfpLegislativeInformation", values, { headers: authHeader() })
  }
  createAdditionalLegInfo(values) {
    return axios.post(API_URL + "Legislatives/createAdditionalLegInfo", values, { headers: authHeader() })
  }


  postProgram(sid, fieldname, val) {
    return axios.post(API_URL + "submission/id/" + sid + "/fieldname/" + fieldname, val, { headers: authHeader() })
  }
  sendEligibleType(sid, ans, val) {
    return axios.post(API_URL_TEST + "eligibility/submission_eligibility_responses/sid/" + sid + "/aid/" + ans, val)
  }
  createAttachementFile(id, val) {
    return axios.post(API_URL + "attachements/createAttachementFile?id=" + id, val, 
    {
       headers: {
      "Content-Type": "multipart/form-data",
    }
  })
  }
  getAttachementFile(id) {
    return axios.get(API_URL + "attachements/getAttachementFile?rfp_responce_id="+id, { headers: authHeader() })
  }
  downloadFiles(value) {
   
    return axios({
      url: API_URL + "attachements/downloadAttachementFile?file="+ value, //your url
      method: 'GET',
      responseType: 'blob',
      //headers: authHeader(), // important
  }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', value); //or any other extension
      document.body.appendChild(link);
      link.click();
  });
    
  }
  deleteAttachements(id,val) {
    return axios.delete(API_URL + "attachements/deleteAttachementFile?rfp_responce_id="+id,val, { headers: authHeader() })
  }

  createAttachements(values) {
    return axios.post(API_URL + "attachements/createAttachements", values, { headers: authHeader() })
  }

  createPeroformanceMeasure(values) {
    return axios.post(API_URL + "PerformanceMeasure/createPeroformanceMeasure", values, { headers: authHeader() })
  }
  getPerMeasureListbyMeasureID(values) {
    return axios.post(API_URL + "PerformanceMeasure/getPerMeasureListbyMeasureID", values, { headers: authHeader() })
  }
  deletePerformAttAndvalueById(values) {
    return axios.post(API_URL + "PerformanceMeasure/deletePerformAttAndvalueById", values, { headers: authHeader() })
  }
  getPreAttNameByMeasureId(values) {
    return axios.post(API_URL + "PerformanceMeasure/getPreAttByMeasureId", values, { headers: authHeader() })
  }
  getPreSubAttByName(values) {
    return axios.post(API_URL + "PerformanceMeasure/getPreSubAttByName", values, { headers: authHeader() })
  }
  createAgreement(values) {
    return axios.post(API_URL + "Agreements/createAgreement", values, { headers: authHeader() })
  }

}

export default new UserService();
