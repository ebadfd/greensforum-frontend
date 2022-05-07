import { createStyles } from "@mantine/core";
import { RegisterForm } from "../components/Register/register";

const useStyles = createStyles(() => ({
  wrapper: {
    minHeight: 300,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(/nsbm1.png)",
  },
}));

export default function Register() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <RegisterForm />
    </div>
  );
}
