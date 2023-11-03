import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "@/public/imgs/logo.svg";
import darkLogo from "@/public/imgs/dark-logo.svg";
import Image from "next/image";
import useAuthStore from "@/stores/authStore";
import { Button, Select } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import useThemeStore from "@/stores/themeStore";
import { useRouter } from "next/router";
import useUserStore from "@/stores/userStore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const theme = useTheme();
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const { isLoggedIn } = useAuthStore();
  const { isLightTheme, switchTheme } = useThemeStore();
  const { userData } = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileRedirect = (event) => {
    if (!!userData.isUserInfoComplete) {
      router.push("/profile");
    } else {
      router.push("/profile-edit");
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    signOut(auth);
    handleMenuClose();
  };

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    router.push({ pathname, query }, asPath, {
      locale: value,
    });
  };

  const loginButton = (
    <Button
      sx={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginLeft: "10px",
      }}
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );

  const signupButton = (
    <Button
      sx={{
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        marginLeft: "10px",
      }}
      onClick={() => {
        router.push("/signup");
      }}
    >
      Signup
    </Button>
  );

  const themeSwitch = (
    <IconButton
      size="large"
      aria-label="show 4 new mails"
      color={theme.palette.text.primary}
      onClick={() => switchTheme()}
    >
      {isLightTheme ? <DarkMode /> : <LightMode />}
    </IconButton>
  );

  const languageSelect = (
    <Select
      labelId="select"
      id="select"
      onChange={handleLanguageChange}
      autoWidth
      value={locale}
      sx={{
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
      }}
    >
      <MenuItem value={"en"}>EN</MenuItem>
      <MenuItem value={"ar"}>AR</MenuItem>
    </Select>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileRedirect}>Profile</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLoggedIn ? (
        <Box>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              {!userData.profileImg ? (
                <AccountCircle />
              ) : (
                <Image
                  src={userData.profileImg}
                  height={30}
                  width={30}
                  alt="profile-picture"
                  style={{ borderRadius: "100px" }}
                />
              )}
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
            {themeSwitch}
          </MenuItem>
          <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
            {languageSelect}
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem>{loginButton}</MenuItem>
          <MenuItem>{signupButton}</MenuItem>
          <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
            {themeSwitch}
          </MenuItem>
          <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
            <Select
              labelId="select"
              id="select"
              onChange={handleLanguageChange}
              autoWidth
              value={locale}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
            >
              <MenuItem value={"en"}>EN</MenuItem>
              <MenuItem value={"ar"}>AR</MenuItem>
            </Select>
          </MenuItem>
        </Box>
      )}
    </Menu>
  );

  return (
    <Box style={{ backgroundColor: theme.palette.background.default }}>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
        sx={{ paddingTop: { xs: ".5rem", sm: ".3rem" } }}
      >
        <Toolbar sx={{ width: "90%", margin: "0 auto" }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" noWrap component="div">
            <Image
              src={isLightTheme ? Logo : darkLogo}
              alt="logo"
              width={150}
              height={50}
            />
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: { md: "center" },
            }}
          >
            {languageSelect}

            {isLoggedIn ? (
              <>
                {themeSwitch}
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  {!userData.profileImg ? (
                    <AccountCircle />
                  ) : (
                    <Image
                      src={userData.profileImg}
                      height={40}
                      width={40}
                      alt="profile-picture"
                      style={{ borderRadius: "100px" }}
                    />
                  )}
                </IconButton>
              </>
            ) : (
              <>
                {themeSwitch}
                {loginButton}
                {signupButton}
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
