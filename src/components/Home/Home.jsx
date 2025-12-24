import * as React from "react";
import "./Home.css";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { MdOutlineDiscount } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import car from "/img/sport-car.png";
import { calculateRandomPrice } from "../PriceCalculator/PriceCalculator";
import { generateRandomData } from "../../tripGenerator";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { SiAccuweather } from "react-icons/si";
import { FaTrafficLight, FaClock } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer(props) {
  const { window } = props;

  const [trip, setTrip] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const finalPrice = React.useMemo(() => {
    if (!trip) return 0;
    return calculateRandomPrice(trip);
  }, [trip]);

  const toggleDrawer = (newOpen) => () => {
    if (newOpen) {
      // هر بار که دکمه کلیک می‌شود (برای باز کردن) یک سفر جدید ایجاد کن
      const newTrip = generateRandomData();
      setTrip(newTrip);
    } else {
      // هنگام بستن Drawer، trip را پاک کن
      setTrip(null);
    }
    setOpen(newOpen);
  };

  React.useEffect(() => {
    if (!open) return;

    const duration = 2000;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      setPrice(Math.floor(progress * finalPrice));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [open, finalPrice]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />

      {trip && open && (
        <div className="fixed top-0 left-0 right-0 z-[1300] pointer-events-none">
          <div className="mx-auto max-w-md px-4 pt-4">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="text-center text-gray-700 font-semibold mb-3">
                وضعیت سفر
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <StatusBadge
                  label="هوا"
                  value={trip.weather}
                  icon={<SiAccuweather />}
                />
                <StatusBadge
                  label="ترافیک"
                  value={trip.traffic}
                  icon={<FaTrafficLight />}
                />
                <StatusBadge
                  label="ساعت"
                  value={trip.time}
                  icon={<FaClock />}
                />
                <StatusBadge
                  label="مسافت"
                  value={`${trip.distance} km`}
                  icon={<GiPathDistance />}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            width: "400px",
            margin: "auto",
          },
        }}
      />

      <Box sx={{ textAlign: "center" }}>
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            borderRadius: "50px",
            padding: "10px 30px",
            backgroundColor: "#000",
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          دریافت سفر
        </Button>
      </Box>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography component="div" sx={{ p: 2 }}>
            <div className="flex justify-center text-2xl">ماشین</div>
          </Typography>
        </StyledBox>

        <StyledBox sx={{ px: 2, pb: 2, height: "100%" }}>
          <div className="flex flex-col h-full mt-12">
            <span className="flex justify-center text-2xl mb-6">
              {trip
                ? `از ${trip.origin} به ${trip.destination}`
                : "در حال تولید سفر..."}
            </span>

            <div className="flex justify-between items-center pt-10">
              <span className="text-2xl flex items-center">
                <img className="w-10 ml-2.5" src={car} />
                محاسبه قیمت
              </span>

              <div className="text-right">
                <div className="text-2xl">
                  {price.toLocaleString("fa-IR").replace(/٬/g, ",")} ریال
                </div>
              </div>
            </div>

            <div className="mt-auto pb-12">
              <hr className="h-px bg-gray-300 border-none rounded mb-2" />
              <div className="flex justify-between px-7">
                <span className="flex flex-col items-center text-2xl cursor-pointer">
                  <CgDetailsMore />
                  گزینه‌های سفر
                </span>

                <div className="w-px h-12 bg-gray-300"></div>

                <span className="flex flex-col items-center text-2xl cursor-pointer">
                  <MdOutlineDiscount />
                  کد تخفیف
                </span>
              </div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
