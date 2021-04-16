import React, { Component, Fragment, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col,Card, Typography, AutoComplete, Divider } from "antd";
import Axios from "axios";
import {SearchOutlined} from '@ant-design/icons'



const Join = () => {

  const [searchValue, setSearchValue] = useState('')
  const [options, setOptions] = useState([])
  const [viewData,setViewData] = useState([]);
  const [searchedData,setSearchedData] = useState([]);
  const viewRooms = () => {
    
  };
  useEffect(() =>{
      
      Axios.get("http://localhost:8000/api/adds/")
      .then((res) => {
        let tempOptions = []
        res.data.forEach(d => {
            tempOptions.push({value: d.room_name})
        });
        setOptions(tempOptions)
        setViewData(res.data)
      })
      .catch((er) => console.log(er));
  },[])

  useEffect(() => {
    if (searchValue === '') {
        setSearchedData([])
    }
    }, [searchValue])

  const searchRoom = () => {
        if(searchValue === '') return;
        let result = viewData.filter(d => d.room_name.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchedData(result)
    }

  return (
    <Fragment>
            <Row>
                <Col xs={24}>
                <div class="main">
                   <h1 style={{ marginTop: "30px", marginBottom: "30px" }}> Recommended Rooms</h1>
                </div>
                </Col>
            </Row>
            <Row style={{margin: "25px 0"}}>
                <Col xs={24}>
                    {options &&
                        <Row gutter={16}>
                            <Col xs={20} md={6}>
                                <AutoComplete
                                    style={{width: "100%",marginLeft: "580px"}} 
                                    onSearch={(value) => {
                                        setSearchValue(value)
                                        console.log(value)
                                        let result = viewData.filter(d => d.room_name.toLowerCase().includes(value.toLowerCase()))
                                        setSearchedData(result)
                                    }}
                                    onSelect={(value) => {
                                        setSearchValue(value)
                                        console.log(value)
                                        let result = viewData.filter(d => d.room_name.toLowerCase().includes(value.toLowerCase()))
                                        setSearchedData(result)
                                    }}                        
                                    notFoundContent="Sorry, the room with this name was not found..."          
                                    options={options}
                                    placeholder={"search rooms by \"name\""}
                                    filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                >
                                </AutoComplete>                        
                            </Col>
                            
                        </Row>
                    }
                </Col>
            </Row>
            {searchedData && searchedData.length > 0 && (
                <div>
                <Row>
                <Col xs={24}>
                <div class="main">
                  <h4 style={{ marginTop: "30px", marginBottom: "30px" }}>
                  {"Searched Rooms by name \"" + searchValue + "\""}
                  </h4>
                </div>

                </Col>

                <Col xs={24}>

                    <Row gutter={[40, 16]}>

                        {searchedData && (searchedData.map((d, index) => <Col xs={24} md={8} key={index}>
                            <Card
                                hoverable
                                bordered
                                style={{ width: "80%" ,marginLeft: "50px"}}
                                >
                                <Row>
                                <Col xs={24}>
                                  Room  Id:<Typography.Text style={{float: "right"}} level={5}>{d.id}</Typography.Text>                                        
                                </Col>
                                 <Col xs={24}>
                                  Room Name:<Typography.Text style={{float: "right"}}level={5}>{d.room_name}</Typography.Text>                                        
                                    </Col>
                                    <Col xs={24}>
                                    Genre:    <Typography.Text style={{float: "right"}} >{d.genre}</Typography.Text>                                        
                                    </Col>
                                    
                                </Row>
                            </Card>
                        </Col>))}

                    </Row>

                </Col>
            </Row>
            <Divider/>
            </div>
            )}
            <Row>
                <Col xs={24}>
                <div class="main">
                  <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
                  { searchedData && searchedData.length > 0 ? "All Rooms" : "Rooms"}
                  </h2>
                </div>
                   

                </Col>

                <Col xs={24}>

                    <Row gutter={[40, 16]}>

                        {viewData && (viewData.map((d, index) => <Col xs={24} md={8} key={index}>
                            <Card
                                hoverable
                                bordered
                                style={{ width: "80%",marginLeft: "50px" }}
                                 >
                                <Row>
                                <Col xs={24}>
                                  Room  Id:<Typography.Text style={{float: "right"}} level={5}>{d.id}</Typography.Text>                                        
                                </Col>
                                 <Col xs={24}>
                                  Room Name:<Typography.Text style={{float: "right"}}level={5}>{d.room_name}</Typography.Text>                                        
                                    </Col>
                                    <Col xs={24}>
                                    Genre:    <Typography.Text style={{float: "right"}} >{d.genre}</Typography.Text>                                        
                                    </Col>
                                    
                                </Row>
                            </Card>   
                        </Col>))}

                    </Row>

                </Col>
            </Row>
        </Fragment>
    )
}

export default Join;
