import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStyles } from "../../styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { header } from "../../../../utils/authheader";
import { toast } from "react-toastify";
import { StyledTypography } from "./style";
import { useDispatch } from "react-redux";
import { GetLocationScenarioVUCount } from "../../../../redux/actions/settingAction";
const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

const data = [
  {
    value: "mumbai",
    label: "mumbai",
  },
  {
    value: "mumbaiindia1",
    label: "Mumbai India",
  },
];
export default function LocationPanel({ PerformanceFileId }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [locationData, setLocationData] = useState([]);
  const [formData, setFormData] = useState({
    selectedLocation: null,
  });
  const [valueLocation, setValueLocation] = useState(data);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [trafficPercentage, settrafficPercentage] = useState(0);
  const [totalTraficPercent, settotalTraficPercent] = useState(0);
  const [noOfUser, setnoOfUser] = useState(0);
  const [addLocation, setAddLocation] = useState(false);
  const [totalUsers, settotalUsers] = useState(0);
  const [designTabsActive, setDesignTabsActive] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const loadRes = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const loadData = loadRes.data;
      const resData = response.data;
      if (Array.isArray(loadData)) {
        settotalUsers(loadData[0].TotalUsers);
        if (Array.isArray(resData)) {
          settotalTraficPercent(resData.reduce((sum,data)=>{return sum+data.PercentageTraffic},0))
          setLocationData(resData);
        } else setLocationData([]);
      } else settotalUsers(0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive);
  };
  const handleFieldChange = (fieldName, fieldInput) => {
    if (fieldName === "selectedLocation") setSelectedLocation(fieldInput);
    else if (fieldName === "noOfUser") {
      setnoOfUser(fieldInput.target.value);
    } else {
      settrafficPercentage(fieldInput.target.value);
    }
  };

  const handleLocationFieldChange = (event, id, type) => {
    if (type === "percentage") {
      const updateLocationData = locationData.map((data) =>
        data.Id !== id
          ? data
          : { ...data, PercentageTraffic: event.target.value }
      );
      setLocationData(updateLocationData);
    } else {
      const updateLocationData = locationData.map((data) =>
        data.Id !== id ? data : { ...data, Name: event?.value }
      );
      setLocationData(updateLocationData);
    }
  };

  const handleLocationUpdate = async(event,id) => {
    if (event.key === "Enter") {
      let totalPercent = locationData.reduce((sum, data) => {
        return sum + parseInt(data.PercentageTraffic, 10);
      }, 0);
      settotalTraficPercent(totalPercent);
      if (totalPercent !== 100) {
        toast.error("Total percentage should be 100");
        return;
      }

      const locationToUpdate = locationData.find(data=>data.Id === id)
      if(!locationToUpdate.Name)
      {
        toast.error('Please select location')
        return
      }else{
        
        try {
          const res =await axios.post(
            `${BASE_URL}/Performance/UpdateLoaction`,
            locationToUpdate,
            header()
          );
          if (res.data.status === "success") {
            toast.info("Successfully saved", {
              style: {
                background: "rgb(101, 77, 247)",
                color: "rgb(255, 255, 255)",
              },
            });
    
            // Update propertyList after successful submission
            fetchData();
          }
        } catch (error) {
          console.log("error saving ", error);
          toast.error("Network error");
        }
      }
    }
  };
  const handleKeyPress = (event) => {
    let totalPercent = locationData.reduce((sum, data) => {
      return sum + parseInt(data.PercentageTraffic, 10);
    }, 0);
    totalPercent += parseInt(trafficPercentage ? trafficPercentage : 0);
    settotalTraficPercent(totalPercent);
    console.log("total percent", totalPercent);
    if (event.key === "Enter") {
      // Submit form or take action
      if (!selectedLocation) {
        toast.error("select location");
        return;
      }
      if (totalPercent !== 100) {
        toast.error("Total percentage should be 100");
        return;
      }
      let payload = {
        id: 0,
        performanceFileId: PerformanceFileId,
        name: selectedLocation?.value,
        numberUser: noOfUser,
        percentageTraffic: trafficPercentage,
      };
      submitLocation(payload);
    }
  };

  const submitLocation = async (payload) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/AddLocation`,
        payload,
        header()
      );
      console.log("res", res);
      if (res.data === "Success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update propertyList after successful submission
        fetchData();
        dispatch(GetLocationScenarioVUCount(PerformanceFileId))
        setSelectedLocation(null);
        setnoOfUser(0);
        settrafficPercentage(0);
      } else {
        toast.error("Submitting error");
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };

  const handleDelete = async (locationId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteLocation?Id=${locationId}`,
        header()
      );

      if (res.data.status === "success") {
        toast.info("Successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update propertyList after successful deletion
        fetchData();
      }
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Network error");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setAddLocation(!addLocation)}
        style={{
          fontSize: 14,
          backgroundColor: "rgb(101, 77, 247)",
          color: "#ffffff",
          cursor: "pointer",
          padding: "8px 14px",
          marginTop: "0px",
          marginBottom: "10px",
          marginLeft: "auto",
          display: "block",
        }}
      >
        <AddIcon /> Add
      </Button>
      <TableContainer
        component={Paper}
        style={{
          border: "solid 2px #DADADA",
          borderRadius: "5px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "50%" }}>
                <StyledTypography> Locations</StyledTypography>
              </TableCell>
              <TableCell align="center" style={{ width: "20%" }}>
                <StyledTypography>% of Traffic</StyledTypography>
              </TableCell>
              <TableCell align="center" style={{ width: "20%" }}>
                <StyledTypography>no. of Users (s)</StyledTypography>
              </TableCell>
              <TableCell align="center" style={{ width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationData?.map((item) => {
              return (
                <TableRow
                  key={item.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ width: "50%" }}>
                    <Select
                      options={valueLocation}
                      value={{ label: item.Name, value: item.Name }}
                      isClearable={true}
                      menuPosition={"fixed"}
                      onChange={(loc) =>
                        handleLocationFieldChange(loc, item.Id, "location")
                      }
                    />
                  </TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    <input
                      type="number"
                      min={0}
                      value={item.PercentageTraffic}
                      className={classes.inputField}
                      onChange={(e) =>
                        handleLocationFieldChange(e, item.Id, "percentage")
                      }
                      onKeyDown={(e)=>handleLocationUpdate(e,item.Id)}
                    />
                  </TableCell>

                  <TableCell align="center" style={{ width: "20%" }}>
                    <StyledTypography>
                      {(totalUsers / 100) * item.PercentageTraffic}
                    </StyledTypography>
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(item.Id);
                      }}
                      style={{ cursor: "pointer", color: "#f74d4d" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {addLocation && (
              <TableRow
                key={"a"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ width: "50%" }}>
                  <Select
                    options={valueLocation}
                    value={selectedLocation}
                    isClearable={true}
                    onChange={(selected) =>
                      handleFieldChange("selectedLocation", selected)
                    }
                    menuPosition={"fixed"}
                  />
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  <input
                    type="number"
                    value={trafficPercentage}
                    className={classes.inputField}
                    onChange={(e) => {
                      handleFieldChange("trafficPercentage", e);
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </TableCell>

                <TableCell align="center" style={{ width: "20%" }}>
                  <StyledTypography>
                    {(totalUsers / 100) * trafficPercentage}
                  </StyledTypography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {totalTraficPercent !== 100 && (
          <StyledTypography color="error" textAlign="right" m={3}>
            Total traffic percentage should be 100 *
          </StyledTypography>
        )}
      </TableContainer>
    </>
  );
}
