import "./styles.css";
import { activateForm, handleFormData } from "./form.js";
import { initialize } from "./DOM.js";

const defaultLocation = "toronto";

handleFormData(defaultLocation);
activateForm();
initialize();
