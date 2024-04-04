import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { useStyles } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DesignTabs from "./Component/Design/DesignTabs";
import { header, headerForm } from "../../utils/authheader";
import { StyledTypography } from "./styles";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function TableTestCase({
  testCase,
  showAddNewElement,
  setShowAddNewElement,
  rootId,
  apiCalling,
}) {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const testNamefield = useRef();
  const [testCaseData, setTestCaseData] = useState([]);
  console.log("testCaseData", testCaseData);
  const [expandedAccord, setExpandedAccord] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPerformanceFileByRootId?RootId=${rootId}`,
        header()
      );
      // Assuming response.data is the array of data you want to set as listData
      setTestCaseData(response.data == "" ? [] : response.data);
      const searchParams = new URLSearchParams(location.search);
      const testId = parseInt(searchParams.get("testid"));
      if (testId && Array.isArray(response.data)) {
        const testToEdit = response.data.find((item) => item.id === testId);
        setExpandedAccord(
          expandedAccord ? expandedAccord : testToEdit.testCaseName
        );
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestCaseData([]);
    }
  };
  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, [rootId]);
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const testId = parseInt(searchParams.get("testid"));
  //   if (testId && Array.isArray(testCaseData)) {
  //     const testToEdit = testCaseData.find((item) => item.id === testId);
  //     setExpandedAccord(testToEdit ? testToEdit.testCaseName : "");
  //   }
  // }, []);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const fileDataRef = useRef(null);
  const [designTabsActive, setDesignTabsActive] = useState(false);
  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileSaving = async () => {
    if (!selectedFile) {
      toast.error("please select file");
      return;
    }
    const formData = new FormData();
    formData.append("id", 0);
    formData.append("rootId", rootId);
    formData.append("testCaseName", testNamefield.current.value);
    formData.append("binaryData", selectedFile);
    formData.append("fileName", selectedFile.name);

    try {
      const response = await axios.post(
        `${BASE_URL}/Performance/AddPerformanceFile`,
        formData,
        headerForm()
      );
      console.log("response", response);
      fetchData();
      apiCalling();
      setSelectedFile(null);
      setExpandedAccord(testNamefield.current.value);
      testNamefield.current.value = "";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDeleteElement = async (id, event) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        `${BASE_URL}/Performance/DeletePerformanceFile?Id=${id}`,
        { Id: id },
        header()
      );
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };
  function truncateFileName(fileName, maxLength) {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      const truncatedName = fileName.substring(0, maxLength);
      const extensionIndex = fileName.lastIndexOf(".");
      const extension = fileName.substring(extensionIndex);
      return truncatedName + "..." + extension;
    }
  }
  const selectedAccodStyle = {
    border: "2px solid #654DF7",
    // color: "white",
    borderRadius: "5px",
  };
  return (
    <TableContainer
    // component={Paper}
    // style={{
    //   border: testCaseData.length > 0 ? "solid 2px #DADADA" : "none",
    //   borderRadius: testCaseData.length > 0 ? "5px" : "",
    // }}
    >
      <Table aria-label="simple table">
        {testCaseData.length > 0 && (
          <TableHead sx={{ backgroundColor: "#dedede" }}>
            <TableRow>
              <TableCell colSpan={3}>
                <Stack
                  width="100%"
                  display="felx"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <StyledTypography>Scenario</StyledTypography>
                  <StyledTypography>File Name</StyledTypography>
                  <StyledTypography>Action</StyledTypography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {testCaseData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell colSpan={3} style={{ padding: "0px" }}>
                <Accordion
                  expanded={expandedAccord === item.testCaseName}
                  onChange={handleExpandAccord(item.testCaseName)}
                  sx={{
                    boxShadow: "none",
                    paddingLeft: "0px",
                    // border:'1px solid red',
                    marginTop: "6px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          color:
                            expandedAccord === item.testCaseName
                              ? "white"
                              : "black",
                        }}
                      />
                    }
                    style={
                      expandedAccord === item.testCaseName
                        ? selectedAccodStyle
                        : {}
                    }
                  >
                    <Stack
                      width="100%"
                      display="felx"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <StyledTypography align="left">
                        {item.testCaseName}
                      </StyledTypography>
                      <StyledTypography align="left">
                        {truncateFileName(item.fileName, 40)}
                      </StyledTypography>
                      <DeleteIcon
                        style={{
                          color:
                            expandedAccord === item.testCaseName
                              ? "white"
                              : "red",
                        }}
                        onClick={(e) => handleDeleteElement(item.id, e)}
                      />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DesignTabs PerformanceFileId={item.id} />
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
          {!showAddNewElement && (
            <TableRow
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell colSpan={3}>
                <Stack
                  width="100%"
                  display="felx"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".jmx"
                  onChange={handleFileChange}
                />

                <input
                  type="text"
                  placeholder="Enter Scenario Name"
                  ref={testNamefield}
                  style={{
                    fontSize: 14,
                    borderRadius: "4px",
                    border: "1px solid #654df7",
                    outline: "none",
                    padding: "6px",
                  }}
                />
                <Button
                onClick={handleButtonClick}
                  style={{
                    backgroundColor: "rgb(101, 77, 247)",
                    color: "#ffffff",
                    cursor: "pointer",
                    textTransform: "toLowerCase",
                  }}
                >
                  <StyledTypography style={{ textTransform: "none" }}>
                    {selectedFile ? `${selectedFile.name}` : "Choose file"}
                  </StyledTypography>
                </Button>
                <Button
                  style={{
                    fontSize: 14,
                    backgroundColor: !selectedFile
                      ? "rgba(101, 77, 247, 0.5)"
                      : "rgb(101, 77, 247)",
                    color: "#ffffff",
                    cursor: !selectedFile ? "not-allowed" : "pointer",
                    textTransform: "none",
                  }}
                  disabled={!selectedFile}
                  onClick={handleFileSaving}
                >
                  Save
                </Button>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
