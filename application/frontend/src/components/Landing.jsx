import React, { Component, useState, Box, Flex } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";

const Landing = () => {
  return (
    <div>
      <Link to="/Search">Search</Link>
    </div>
  );
};

export default Landing;
