import { all, fork } from "redux-saga/effects";
import { watchLogin } from "./LoginSaga";
import { watchAddPatient } from "./AddPatientSaga";
import { watchWardsList } from "./ListWardsSaga";
import { watchListPatient } from "./PatientListSaga";
import { watchSearchPatient } from "./SearchPateintSaga";
import { watchSortPatientList } from "./SortPatientListSaga";
import { watchHighPatientRisk } from "./HighRiskPatientSaga";
import { watchAddPlan } from "./AddPlanSaga";
import { watchWardAssign } from "./AssignWardSaga";
import { watchPateintTransfer } from "./TransferPatientSaga";
import { watchPateintDeclare } from "./DeclarePatientSaga";
import { watchPateintDischarge } from "./DischargePatientSaga";
import { watchSearchWard } from "./SearchWardSaga";
import { watchStaffList } from "./ListStaffSaga";
import { watchSearchStaff } from "./SearchStaffSaga";
import { watchStaffFilter } from "./FilterStaffSaga";
import { watchOtpSend } from "./SendOtpSaga";
import { watchForgetPass } from "./ForgotPasswordSaga";
import { watchResetPassword } from "./PasswordResetSaga";
import { watchDashBoard } from "./DashBoardSaga";
import { watchScoreBishop } from "./BishopScoreSaga";
import { watchListParity } from "./ParityDetailSaga";
import { watchListPlan } from "./PlanListSaga";
import { watchTransferHistory } from "./TranferHistorySaga";
import { watchUpdateStatusLabour } from "./UpdateLabourStatusSaga";
import { watchLcgAdd } from "./AddLcgSaga";
import { watchDeliveryComplete } from "./DeliveryCompletedSaga";
import { watchBabyAdd } from "./BabyAddSaga";
import { watchScoreApgar } from "./ApgarScoreSaga";
import { watchBabyList } from "./BabyListSaga";
import { watchBabyEdit } from "./BabyEditSaga";
import { watchDrugCategoryList } from "./ListDrugCategorySaga";
import { watchDrugAdd } from "./DrugAddSaga";
import { watchDrugList } from "./DrugListSaga";
import { watchDrugStatusToggle } from "./TogleDrugStatusSaga";
import { watchLcgDecisionUpdate } from "./LcgDecisionSaga";
import { watchLcgDetails } from "./LcgDetailsSaga";
import { watchDutyStatusToggle } from "./TogleDutyStatusSaga";
import { watchNotfStatusToggle } from "./TogleNotfStatusSaga";
import { watchProfileUser } from "./StaffProfileSaga";
import { watchProfileUpdate } from "./ProfileUpdateSaga";
import { watchChangePass } from "./ChangePasswordSaga";
import { watchDetailPatient } from "./DetailPatientSaga";
import { watchRoundDetail } from "./RoundDetailSaga";
import { watchRoundPatientFilter } from "./FilterRoundSaga";
import { watchRoundSearch } from "./SearchPatientRoundSaga";
import { watchTokenFcmSet } from "./SetFcmTokenSaga";
import { watchNotfList } from "./ListNotificationSaga";
import { watchLcgReport } from "./LcgViewSaga";
import { watchAlertToggle } from "./TogleAlertHideSaga";

export default function* rootSaga() {
  return yield all([
    fork(watchLogin),
    fork(watchAddPatient),
    fork(watchWardsList),
    fork(watchListPatient),
    fork(watchSearchPatient),
    fork(watchSortPatientList),
    fork(watchHighPatientRisk),
    fork(watchAddPlan),
    fork(watchWardAssign),
    fork(watchPateintTransfer),
    fork(watchPateintDeclare),
    fork(watchPateintDischarge),
    fork(watchSearchWard),
    fork(watchStaffList),
    fork(watchSearchStaff),
    fork(watchStaffFilter),
    fork(watchOtpSend),
    fork(watchForgetPass),
    fork(watchResetPassword),
    fork(watchDashBoard),
    fork(watchScoreBishop),
    fork(watchListParity),
    fork(watchListPlan),
    fork(watchTransferHistory),
    fork(watchUpdateStatusLabour),
    fork(watchLcgAdd),
    fork(watchDeliveryComplete),
    fork(watchBabyAdd),
    fork(watchScoreApgar),
    fork(watchBabyList),
    fork(watchBabyEdit),
    fork(watchDrugCategoryList),
    fork(watchDrugAdd),
    fork(watchDrugList),
    fork(watchDrugStatusToggle),
    fork(watchLcgDecisionUpdate),
    fork(watchLcgDetails),
    fork(watchDutyStatusToggle),
    fork(watchNotfStatusToggle),
    fork(watchProfileUser),
    fork(watchProfileUpdate),
    fork(watchChangePass),
    fork(watchDetailPatient),
    fork(watchRoundDetail),
    fork(watchRoundPatientFilter),
    fork(watchRoundSearch),
    fork(watchTokenFcmSet),
    fork(watchNotfList),
    fork(watchLcgReport),
    fork(watchAlertToggle),
  ]);
}
