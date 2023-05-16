// import { sampleProducts } from "./sample-products";
import  React ,{useState, useEffect} from 'react'
import nofaServices from '../../services/adminServices'


export const insertItem = item => {

    const [tabList, setTabList] = React.useState();
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));

    useEffect(() => {   
    
            const datavalue = {
                "nofa_id": Nofid
            }
    
            nofaServices.getNofatabsByNofaId(datavalue).then(
                response => {
                    // setLoader(false)
                    const tab3 = response.data.data;            
                    setTabList(tab3);
                    console.log("grid tab", tab3)
    
                },
                error => {
    
                }
            );         
    }, []);
    const generateId = tabList =>
    tabList.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;


    item.ProductID = generateId(tabList);
    item.inEdit = false;
    tabList.unshift(item);
    return tabList;
};

export const getItems = () => {
    const [tabList, setTabList] = React.useState();
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));

    useEffect(() => {   
    
            const datavalue = {
                "nofa_id": Nofid
            }
    
            nofaServices.getNofatabsByNofaId(datavalue).then(
                response => {
                    // setLoader(false)
                    const tab3 = response.data.data;            
                    setTabList(tab3);
                    // console.log("grid tab", tab3)
    
                },
                error => {
    
                }
            );         
    }, []);
    return tabList;
};

export const updateItem = item => {

    const [tabList, setTabList] = React.useState();
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));

    useEffect(() => {   
    
            const datavalue = {
                "nofa_id": Nofid
            }
    
            nofaServices.getNofatabsByNofaId(datavalue).then(
                response => {
                    // setLoader(false)
                    const tab3 = response.data.data;            
                    setTabList(tab3);
                    // console.log("grid tab", tab3)
    
                },
                error => {
    
                }
            );         
    }, []);
    let index = tabList.findIndex(record => record.ProductID === item.ID);
    tabList[index] = item;
    return tabList;
};

export const deleteItem = item => {
    const [tabList, setTabList] = React.useState();
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));

    useEffect(() => {   
    
            const datavalue = {
                "nofa_id": Nofid
            }
    
            nofaServices.getNofatabsByNofaId(datavalue).then(
                response => {
                    // setLoader(false)
                    const tab3 = response.data.data;            
                    setTabList(tab3);
                    // console.log("grid tab", tab3)
    
                },
                error => {
    
                }
            );         
    }, []);
    let index = tabList.findIndex(record => record.ProductID === item.ID);
    tabList.splice(index, 1);
    return tabList;
};