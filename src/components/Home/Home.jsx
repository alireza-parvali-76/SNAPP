import * as React from "react";
import "./Home.css";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { MdOutlineDiscount } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import car from "/img/sport-car.png";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0); // ✅ شمارنده عددی

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // ✅ انیمیشن قیمت هنگام باز شدن Drawer
  React.useEffect(() => {
    if (!open) return;

    const start = 0;
    const end = 825000; // عدد نهایی
    const duration = 2000; // به میلی‌ثانیه
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      setPrice(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [open]);

  // لازم فقط برای نمایش Drawer
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            width: "400px",
            margin: "auto",
            background: "red",
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
            "&:hover": { backgroundColor: "" },
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
          <Typography component="div" sx={{ p: 2, color: "black" }}>
            <div className="flex items-center justify-center cursor-pointer">
              <span className="text-2xl">ماشین</span>
            </div>
          </Typography>
        </StyledBox>

        {/* بدنه Drawer */}
        <StyledBox sx={{ px: 2, pb: 2, height: "100%" }}>
          <div className="flex flex-col h-full mt-16 ">
            <div>
              <span className="flex justify-center text-2xl">از ایکس به زدباکس</span>
            </div>
            {/* بخش بالایی */}
            <div className="mt-30">
              <div className="flex justify-between ">
                <span className="text-2xl flex">
                  <img className="w-10 ml-2.5" src={car} />
محاسبه قیمت                   
                </span>

                {/* ✅ جایگزین عدد ثابت با شمارنده */}
                <span className="text-2xl">
                  {price.toLocaleString("fa-IR").replace(/٬/g, ",")} ریال
                </span>
              </div>
            </div>

            {/* بخش پایین Drawer */}
            <div className="mt-auto pb-9">
              <hr class="h-px bg-gray-300 border-none rounded" />
              <div className="flex justify-between px-7 mt-2">
                <span className="flex flex-col items-center text-2xl cursor-pointer mb-5">
                  <CgDetailsMore />
                  گزینه‌های سفر
                </span>
                <div className="w-px h-12 bg-gray-300"></div> {/* خط عمودی */}
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

export default SwipeableEdgeDrawer;
