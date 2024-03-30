/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Checkbox,
  Select,
  Switch,
  Table,
  Tabs,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import Navbar from "../components/Navbar";
import style from "../assets/style";
import { axios } from "../axios";
import { CircleCheck } from "lucide-react";

const HomePage = () => {
  const [notification, setNotification] = useState([]);
  const [type, setType] = useState("Automation");
  const [selectId, setSelectId] = useState("O_12345");
  const [gslId, setGslId] = useState("2123");
  const [rowData, setRowData] = useState({});
  console.log("rowData: ", rowData[0] && rowData[0]["GSL ID"]);

  const data = [
    {
      "GSL ID": 2123,
      "Vendor ID": 123454,
      "Vendor Name": "Bridie Kessler",
      User: "Vendor_1",
      Password: "XXXXXX",
      Indicator: "",
    },
    {
      "GSL ID": 2124,
      "Vendor ID": 123454,
      "Vendor Name": "Bridie Kessler",
      User: "Vendor_2",
      Password: "XXXXXX",
      Indicator: "",
    },
    {
      "GSL ID": 2125,
      "Vendor ID": 123454,
      "Vendor Name": "Bridie Kessler",
      User: "Vendor_3",
      Password: "XXXXXX",
      Indicator: "",
    },
  ];

  useEffect(() => {
    const selectedRowData = data.filter(
      (item) => Number(item["GSL ID"]) === Number(gslId)
    );
    setRowData(selectedRowData);
  }, [gslId]);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const [file, setFile] = useState(null);

  const onChange = (checked, itemLabel) => {
    if (checked) {
      if (!notification.find((entry) => entry.label === itemLabel)) {
        setNotification([...notification, { label: itemLabel, value: true }]);
      }
    } else {
      setNotification(
        notification.filter((entry) => entry.label !== itemLabel)
      );
    }
  };

  const onStatusSave = () => {
    axios
      .post("/save-status", { notification, selectId, type })
      .then((res) => {
        message.success("Status Saved");
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Status Not Saved, Some Error Occurred");
        console.log(err);
      });
  };

  const SwitchWithLabel = ({ label, onChange, type }) => {
    const checked =
      notification.find((entry) => entry.label === label)?.value || false;

    return (
      <div className="flex items-center gap-4">
        <Switch
          disabled={type === "Automation"}
          className="bg-gray-300"
          size="small"
          checked={checked}
          onChange={(checked) => onChange(checked, label)}
        />
        <span>{label}</span>
      </div>
    );
  };

  // Helper function to check if a notification label is checked
  const isNotificationChecked = (label) => {
    return notification.some((entry) => entry.label === label);
  };

  const items = [
    {
      key: "1",
      label: "Pre-REF Process",
      children: (
        <div className="grid grid-cols-2">
          <SwitchWithLabel
            label="Data Briefing Doc"
            checked={isNotificationChecked("Data Briefing Doc")}
            onChange={(checked) => onChange(checked, "Data Briefing Doc")}
            type={type}
          />
          <SwitchWithLabel
            label="RFP Draft Status"
            checked={isNotificationChecked("RFP Draft Status")}
            onChange={(checked) => onChange(checked, "RFP Draft Status")}
            type={type}
          />
          <SwitchWithLabel
            label="Completion dates"
            checked={isNotificationChecked("Completion dates")}
            onChange={(checked) => onChange(checked, "Completion dates")}
            type={type}
          />
          <SwitchWithLabel
            label="MSA Process"
            checked={isNotificationChecked("MSA Process")}
            onChange={(checked) => onChange(checked, "MSA Process")}
            type={type}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "REF Process",
      children: (
        <div className="grid grid-cols-2">
          <SwitchWithLabel
            label="RFP Initiation Process"
            checked={isNotificationChecked("RFP Initiation Process")}
            onChange={(checked) => onChange(checked, "RFP Initiation Process")}
            type={type}
          />
          <SwitchWithLabel
            label="RFP Response Process"
            checked={isNotificationChecked("RFP Response Process")}
            onChange={(checked) => onChange(checked, "RFP Response Process")}
            type={type}
          />
          <SwitchWithLabel
            label="Vendor Presentatio Process"
            checked={isNotificationChecked("Vendor Presentatio Process")}
            onChange={(checked) =>
              onChange(checked, "Vendor Presentatio Process")
            }
            type={type}
          />
          <SwitchWithLabel
            label="Vendor Selection Process"
            checked={isNotificationChecked("Vendor Selection Process")}
            onChange={(checked) =>
              onChange(checked, "Vendor Selection Process")
            }
            type={type}
          />
          <SwitchWithLabel
            label="Vendor Award Process"
            checked={isNotificationChecked("Vendor Award Process")}
            onChange={(checked) => onChange(checked, "Vendor Award Process")}
            type={type}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "SOW Process",
      children: (
        <div className="grid grid-cols-2">
          <SwitchWithLabel
            label="SOW Completion - Vendor"
            checked={isNotificationChecked("SOW Completion - Vendor")}
            onChange={(checked) => onChange(checked, "SOW Completion - Vendor")}
            type={type}
          />
          <SwitchWithLabel
            label="SOW Completion - Internal"
            checked={isNotificationChecked("SOW Completion - Internal")}
            onChange={(checked) =>
              onChange(checked, "SOW Completion - Internal")
            }
            type={type}
          />
          <SwitchWithLabel
            label="SOW signature Process"
            checked={isNotificationChecked("SOW signature Process")}
            onChange={(checked) => onChange(checked, "SOW signature Process")}
            type={type}
          />
          <SwitchWithLabel
            label="PR Process"
            checked={isNotificationChecked("PR Process")}
            onChange={(checked) => onChange(checked, "PR Process")}
            type={type}
          />
          <SwitchWithLabel
            label="PO Process"
            checked={isNotificationChecked("PO Process")}
            onChange={(checked) => onChange(checked, "PO Process")}
            type={type}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: "Per-Commerce of Study",
      children: (
        <div className="grid grid-cols-2">
          <SwitchWithLabel
            label="Vendor Training Process"
            checked={isNotificationChecked("Vendor Training Process")}
            onChange={(checked) => onChange(checked, "Vendor Training Process")}
            type={type}
          />
          <SwitchWithLabel
            label="Expectation to Training"
            checked={isNotificationChecked("Expectation to Training")}
            onChange={(checked) => onChange(checked, "Expectation to Training")}
            type={type}
          />
          <SwitchWithLabel
            label="Research tools process"
            checked={isNotificationChecked("Research tools process")}
            onChange={(checked) => onChange(checked, "Research tools process")}
            type={type}
          />
          <SwitchWithLabel
            label="Start of Commencement"
            checked={isNotificationChecked("Start of Commencement")}
            onChange={(checked) => onChange(checked, "Start of Commencement")}
            type={type}
          />
        </div>
      ),
    },
  ];

  // Custom component for Switch with label

  const settingsItems = [
    {
      key: "1",
      label: "Setting",
      children: (
        <div className="flex items-center gap-4 text-lg">
          <span>Notifications</span>
          <Checkbox defaultChecked />
          <span>Changes made to your account</span>
        </div>
      ),
    },
    {
      key: "2",
      label: "Profile",
      children: <div className="flex items-center gap-4 text-lg">Profile</div>,
    },
    {
      key: "3",
      label: "Contact",
      children: <div className="flex items-center gap-4 text-lg">Contact</div>,
    },
  ];

  return (
    <div className="">
      <Navbar />
      <main className="grid w-full h-full grid-cols-2 px-8 py-3 gap-7">
        <Card
          title={
            <div className="flex items-center justify-between">
              <div className="text-[#012970] text-[16px]">Status</div>
              <div>
                Material ID: <span>{selectId}</span>
              </div>
            </div>
          }
          color="white"
          className="shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-64 gap-3">
              <label className={`${style.label}`} htmlFor="">
                Select ID
              </label>
              <Select
                defaultValue={selectId}
                onChange={(value) => setSelectId(value)}
                className="w-full"
                options={[
                  { label: "O_12345", value: "O_12345" },
                  { label: "O_12346", value: "O_12346" },
                  { label: "O_12347", value: "O_12347" },
                ]}
              />
            </div>
            <div className="flex items-center gap-3 w-60">
              <label className={`${style.label}`} htmlFor="">
                Type
              </label>
              <Select
                onChange={(value) => setType(value)}
                defaultValue={type}
                className="w-full"
                options={[
                  { label: "Manual", value: "Manual" },
                  { label: "Automation", value: "Automation" },
                ]}
              />
            </div>
          </div>

          <Tabs
            type="card"
            className="status-tabs"
            defaultActiveKey="1"
            items={items}
          />
          <Button
            className="bg-[#198754] hover:!bg-[#198754] hover:!border-[#198754] text-[16px] text-white hover:!text-white mt-5 flex ml-auto px-8 py-2 items-center justify-center"
            onClick={onStatusSave}
          >
            Save
          </Button>
        </Card>
        <Card
          title={<div className="text-[#012970] text-[16px]">User Setting</div>}
          color="white"
          className="shadow-lg"
        >
          <Tabs type="card" defaultActiveKey="1" items={settingsItems} />
          <Button
            className="bg-[#198754] hover:!bg-[#198754] hover:!border-[#198754] text-[16px] text-white hover:!text-white mt-5 flex ml-auto px-8 py-2 items-center justify-center"
            onClick={() => message.success("Saved")}
          >
            Save
          </Button>
        </Card>
        <Card
          title={<div className="text-[#012970] text-[16px]">Notification</div>}
          className="shadow-lg"
        >
          <div className="px-4 py-1 my-2 text-lg bg-[#d1e7dd] h-12 rounded-md text-[#0a3622] flex gap-5 items-center">
            <CircleCheck />
            MSA Submitted Successfully
          </div>
          <div className="px-4 py-1 my-2 text-lg bg-[#fff3cd] h-12 rounded-md text-[#664d03] flex gap-5 items-center">
            <CircleCheck />
            Pending Approval
          </div>
        </Card>
        <Card
          title={<div className="text-[#012970] text-[16px]">Request</div>}
          className="shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="text-[16px]">File Upload</div>
            <input
              className="p-2 border-2"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
          </div>
          <Button
            className="bg-[#0d6efd] hover:!bg-[#0d6efd] hover:!border-[#0d6efd] text-[16px] text-white hover:!text-white mt-5 flex ml-auto px-8 py-2 items-center justify-center"
            onClick={() => message.success("Uploaded")}
          >
            Upload
          </Button>
        </Card>

        <Card className="col-span-2">
          <div className="flex items-center gap-6">
            <label className="w-20" htmlFor="">
              GSL ID
            </label>
            <Select
              onChange={(value) => setGslId(value)}
              defaultValue={gslId}
              className="w-96"
              options={[
                { label: "2123", value: "2123" },
                { label: "2124", value: "2124" },
                { label: "2125", value: "2125" },
              ]}
            />
          </div>
          <table className="w-full mt-4">
            <thead className="w-full py-2 border-b-2">
              <tr>
                <th className="text-center">GSL ID</th>
                <th className="text-center">Vendor ID</th>
                <th className="text-center">Vendor Name</th>
                <th className="text-center">User</th>
                <th className="text-center">Password</th>
                <th className="text-center">Indicator</th>
              </tr>
            </thead>
            <tbody className="w-full py-2 border-b-2">
              <tr>
                <td className="text-center">
                  {rowData[0] && rowData[0]["GSL ID"]}
                </td>
                <td className="text-center">
                  {rowData[0] && rowData[0]["Vendor ID"]}
                </td>
                <td className="text-center">
                  {rowData[0] && rowData[0]["Vendor Name"]}
                </td>
                <td className="text-center">
                  {rowData[0] && rowData[0]["User"]}
                </td>
                <td className="text-center">
                  {rowData[0] && rowData[0]["Password"]}
                </td>
                <td className="text-center">
                  {rowData[0] && rowData[0]["Indicator"]}
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <div className="flex col-span-2 gap-4 ml-auto w-60">
          <Button
            className="bg-[#198754] hover:!bg-[#198754] hover:!border-[#198754] text-[16px] text-white hover:!text-white mt-5 flex ml-auto px-8 py-2 items-center justify-center"
            onClick={() => {
              axios
                .post("/save-all-data", rowData[0])
                .then((res) => {
                  console.log("res: ", res.data);
                  message.success("Saved");
                })
                .catch((err) => {
                  message.error("Failed to save");
                  console.log("err: ", err);
                });
            }}
          >
            Save
          </Button>
          <Button
            className="bg-red-600 hover:!bg-red-600 hover:!border-red-600 text-[16px] text-white hover:!text-white mt-5 flex ml-auto px-8 py-2 items-center justify-center"
            onClick={() => message.success("Cancel")}
          >
            Cancel
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
