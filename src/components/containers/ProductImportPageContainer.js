import { connect } from "react-redux";
import { uploadFile, resetUploadDetails, importProduct } from "../../actions";
import ProductImportPage from "../ProductImportPage";

const mapStateToProps = ({
  appState: {
    isFileUploading,
    isFileUploadFailed,
    isFileUploadSucceeded,
    isImportingProduct,
    isProductImportSucceeded,
    isProductImportFailed,
    newJobId
  },
  uploadDetails
}) => ({
  isFileUploading,
  isFileUploadFailed,
  uploadDetails,
  isFileUploadSucceeded,
  isImportingProduct,
  isProductImportSucceeded,
  isProductImportFailed,
  newJobId
});

const mapDispatchToProps = {
  uploadFile,
  resetUploadDetails,
  importProduct
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ProductImportPage);