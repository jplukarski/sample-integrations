/**
       * If the API call was not successful, the success on the result will return false. An error may be due to:
       
       * 1. A validation error caused by invalid parameters.
       * 2. A processor decline
       * 3. Gateway rejection.
       * 4. Other exceptional conditions

       * This method will collect info on occurred issue by analyzing data in passed ValidationErrors and Transaction objects.

       * This method is returning Hashtable object with info on occurred issue in the following format:
       * key -   responseReasonCode
       * value - one of the following:
            *VENMO_NONCE_EXPIRED

            *VALIDATION_ERROR_ERRORCODE

            *PROCESSOR_ERROR_ERRORCODE

            *GATEWAY_ERROR_ERRORCODE

            *VENMO_NON_IDENTIFIED_ERROR
        * key -   errorInfo
       * value - detailed info on error.
        * @param transactionResult
       * @return
       * @throws Exception
       */

      private static Hashtable getInfoOnOccuredError(ValidationErrors validationErrors, Transaction transaction, String ORDER_ID) throws Exception {
        Hashtable           errorHash = new Hashtable();
        StringBuffer errorInfo = new StringBuffer();
        String responseReasonCode = "";
        try {
               logger.debug("VENMO service for order " + ORDER_ID + ": getInfoOnOccuredError(). ORDER_ID = " + ORDER_ID + ". STARTED." + "\n" + "validationErrors = " + validationErrors + "\n");       
               // Validation declined.
               if(validationErrors != null   &&   validationErrors.getAllDeepValidationErrors().isEmpty() == false) {
                     // Add validation errors to string.
                     for (ValidationError error : validationErrors.getAllDeepValidationErrors()) {
                            responseReasonCode = error.getCode() + "";                              
                            errorInfo.append("validation errCode: " + error.getCode() + "  ");
                            errorInfo.append("validation errMessage: " + error.getMessage() + "  ");
                            errorInfo.append("validation errAttr: " + error.getAttribute() + "  ");
                            if(responseReasonCode.equals("93108")) {
                                  responseReasonCode = "VENMO_NONCE_EXPIRED";
                            } else {                   
                                  responseReasonCode = "VENMO_VALIDATION_ERROR_" + error.getCode().toString();
                            }
                     }
                     errorHash.put("responseReasonCode", responseReasonCode);
                     errorHash.put("errorInfo", errorInfo.toString());
                     logger.error("VENMO service for order " + ORDER_ID + ": VENMO EXCEPTION FOR ORDER : " + ORDER_ID + ".  IT IS VALIDATION ERROR. ENDED. Generated errorInfo = " + errorInfo + "\n" +
                                  "responseReasonCode = " + responseReasonCode + "\n" +
                                  "errorHash = " + errorHash + "\n");       
                     return errorHash;                      
               }              
               // Processor declined
               if(transaction != null   &&   !trimPaddingSpaces(transaction.getProcessorResponseText()).equals("")) {
                     errorInfo.append("processor declined status: " + transaction.getStatus() + "  ");
                     errorInfo.append("processor response code: " + transaction.getProcessorResponseCode() + "  "); 
                     errorInfo.append("processor response text: " + transaction.getProcessorResponseText() + "  ");
                     responseReasonCode = "VENMO_PROCESSOR_ERROR_" + transaction.getProcessorResponseCode();
                     errorHash.put("responseReasonCode", responseReasonCode);
                     errorHash.put("errorInfo", errorInfo.toString());
                     logger.error("VENMO service for order " + ORDER_ID + ": VENMO EXCEPTION FOR ORDER : " + ORDER_ID + ".  IT IS PROCESSOR ERROR. ENDED. Generated errorInfo = " + errorInfo + "\n" +
                                  "responseReasonCode = " + responseReasonCode + "\n" +
                                  "errorHash = " + errorHash + "\n");       
                     return errorHash;                      
               }
               // If the transaction is rejected by the gateway based on your account settings
               if(transaction != null   &&  transaction.getGatewayRejectionReason() != null   &&   !trimPaddingSpaces(transaction.getGatewayRejectionReason().toString()).equals("")) {
                     errorInfo.append("gateway rejection status: " + transaction.getStatus() + "   ");
                     errorInfo.append("gateway rejection reason: " + transaction.getGatewayRejectionReason().toString() + "  ");
                     responseReasonCode = "VENMO_GATEWAY_ERROR_" + transaction.getGatewayRejectionReason().toString();
                     errorHash.put("responseReasonCode", responseReasonCode);
                     errorHash.put("errorInfo", errorInfo.toString());
                     logger.error("VENMO service for order " + ORDER_ID + ": VENMO EXCEPTION FOR ORDER : " + ORDER_ID + ".  IT IS GATEWAY ERROR. ENDED. Generated errorInfo = " + errorInfo + "\n" +
                                  "responseReasonCode = " + responseReasonCode + "\n" +
                                  "errorHash = " + errorHash + "\n");       
                     return errorHash;                      
               }
               // COULD NOT FIND CAUSE OF ISSUE.
               errorHash.put("responseReasonCode", "VENMO_NON_IDENTIFIED_ERROR");
               errorHash.put("errorInfo", "");
               logger.error("VENMO service for order " + ORDER_ID + ": VENMO EXCEPTION FOR ORDER : " + ORDER_ID + ".  NOT IDENTIFIED ERROR. ENDED. Generated errorInfo = " + errorInfo + "\n" +
                            "responseReasonCode = " + responseReasonCode + "\n" +
                            "errorHash = " + errorHash + "\n");      
               return errorHash;
        } catch (Exception ex) {              
               logger.error("VENMO service for order " + ORDER_ID + ": VENMO EXCEPTION FOR ORDER : " + ORDER_ID + ". VENMO EXCEPTION: EXCEPTION IN VENMO service: Exception occured while generating info on occured error. Setting responseReasonCode to VENMO_NON_IDENTIFIED_ERROR" + "\n" +
                            "Action : return object with values set to empty string." + "\n" +
                            "validationErrors = " + validationErrors + "\n" +
                            "transaction = " + transaction + "\n" +
                            "Action : return Hashtable with empty strings for values." + "\n" +
                            "ex = " + ex + "\n" +
                            ex.getMessage() + " -- " + ex.toString(), ex);
               errorHash.put("responseReasonCode", "VENMO_NON_IDENTIFIED_ERROR");
               errorHash.put("errorInfo", "");
               return errorHash;
        }
  }