import { combineReducers } from "@reduxjs/toolkit";
import * as UI from "./UI";
import * as User from "./User";
import * as AddPateint from "./AddPatients";
import * as ListPateints from "./PatientList";
import * as SearchPatient from "./PatientSearch";
import * as SortPatientList from "./SortPatients";
import * as HighRiskPatient from "./HighRiskPatient";
import * as PlanAdd from "./AddPlan";
import * as WardAssign from "./AssignWard";
import * as PatientTransfer from "./TransferPatient";
import * as DeclarePatient from "./DeclarePatient";
import * as DischargePatient from "./DischargePatient";
import * as ListStaff from "./ListStaff";
import * as StaffSearch from "./SearchStaff";
import * as FilterStaff from "./FilterStaff";
import * as SendOtp from "./SendOtp";
import * as PasswordForget from "./ForgotPassword";
import * as ResetPasword from "./PasswordReset";
import * as HomeDashBoard from "./Dashboard";
import * as ScoreBishop from "./BishopScore";
import * as ParityList from "./ParityDetail";
import * as PlanList from "./PlanList";
import * as HistoryTransfer from "./TransferHistory";
import * as UpdateLabourStatus from "./UpdateLabourStatus";
import * as AddLcg from "./AddLCG";
import * as CompleteDelivery from "./DeliveryCompleted";
import * as BabyAdd from "./BabyAdd";
import * as ScoreApgar from "./ApgarScore";
import * as ListBaby from "./BabyList";
import * as UpdateBaby from "./BabyEdit";
import * as DrugCategoryList from "./ListDrugCategory";
import * as DrugsAdd from "./DrugAdd";
import * as ListDrug from "./DrugList";
import * as DrugStatus from "./ToggleDrugStatus";
import * as DecisionLcg from "./LcgDecision";
import * as DetailLcg from "./LcgDetails";
import * as DutyStatus from "./ToggleDutyStatus";
import * as NotfStatus from "./ToggleNotfStatus";
import * as ProfileStaff from "./StaffProfile";
import * as ProfileStaffUpdate from "./ProfileUpdate";
import * as PassChange from "./ChangePassword";
import * as DetailPatient from "./DetailsPatient";
import * as PatienRoundDetail from "./RoundDetail";
import * as FilterRound from "./FilterRoundPatient";
import * as SearchRound from "./SearchPatientRound";
import * as FcmTokenSet from "./SetFcmToken";
import * as ListNotifications from "./ListNotification";
import * as ReportLcg from "./LcgView";
import * as AlertHideToggle from "./ToggleAlertHide";

const reducers = combineReducers({
  ui: UI.uiSliceReducer,
  user: User.userSliceReducer,
  pateintAdd: AddPateint.AddPateintSliceReducer,
  listPateints: ListPateints.PatientListSliceReducer,
  searchPatient: SearchPatient.PatientSearchSliceReducer,
  sortPatientList: SortPatientList.SortPatientListSliceReducer,
  riskPatient: HighRiskPatient.HighRiskPatientSliceReducer,
  planAdd: PlanAdd.AddPlanSliceReducer,
  assignWard: WardAssign.AssignWardSliceReducer,
  patientTransfer: PatientTransfer.TransferPatientSliceReducer,
  declarePatient: DeclarePatient.DeclarePatientSliceReducer,
  dischargePatient: DischargePatient.DischargePatientSliceReducer,
  listStaff: ListStaff.StaffListSliceReducer,
  staffSearch: StaffSearch.StaffSearchSliceReducer,
  filterStaff: FilterStaff.StaffFilterSliceReducer,
  sendOtp: SendOtp.SendOtpSliceReducer,
  passwordForget: PasswordForget.PasswordForgetSliceReducer,
  resetPassword: ResetPasword.ResetPasswordSliceReducer,
  dashBoard: HomeDashBoard.DashBoardSliceReducer,
  scoreBishop: ScoreBishop.BishopScoreSliceReducer,
  parityList: ParityList.ParityListSliceReducer,
  planList: PlanList.PlanListSliceReducer,
  historyTransfer: HistoryTransfer.HistoryTransferSliceReducer,
  updateLabourStatus: UpdateLabourStatus.LabourStatusSliceReducer,
  addLcg: AddLcg.AddLcgSliceReducer,
  completeDelivery: CompleteDelivery.DeliveryCompletedSliceReducer,
  babyAdd: BabyAdd.BabyAddSliceReducer,
  scoreApgar: ScoreApgar.ApgarScoreSliceReducer,
  listBaby: ListBaby.BabyListSliceReducer,
  updateBaby: UpdateBaby.BabyEditSliceReducer,
  categoryDrugList: DrugCategoryList.DrugCategoryListSliceReducer,
  drugsAdd: DrugsAdd.DrugAddSliceReducer,
  listDrug: ListDrug.DrugListSliceReducer,
  statusDrug: DrugStatus.DrugStatusSliceReducer,
  lcgDecision: DecisionLcg.DecisionLcgSliceReducer,
  detailLcg: DetailLcg.DetailListLCGSliceReducer,
  statusDuty: DutyStatus.DutyStatusSliceReducer,
  notfStatus: NotfStatus.NotfStatusSliceeReducer,
  profileStaff: ProfileStaff.UserProfileSliceReducer,
  profileStaffUpdate: ProfileStaffUpdate.UpdateProfileSliceReducer,
  changePass: PassChange.PasswordChangeSliceReducer,
  dataPatient: DetailPatient.DetailPatientSliceReducer,
  patienRoundDetail: PatienRoundDetail.RoundDetailSliceReducer,
  filterRound: FilterRound.RoundFilterSliceReducer,
  searchRound: SearchRound.RoundPatientSearchSliceReducer,
  fcmTokenSet: FcmTokenSet.SetTokenFcmSliceReducer,
  listNotifications: ListNotifications.NotfListSliceReducer,
  reportLcg: ReportLcg.ReportLcgSliceReducer,
  alertHideToggle: AlertHideToggle.HideAlertStatusSliceReducer
});

export {
  reducers,
  UI,
  User,
  AddPateint,
  ListPateints,
  SearchPatient,
  SortPatientList,
  HighRiskPatient,
  PlanAdd,
  WardAssign,
  PatientTransfer,
  DeclarePatient,
  DischargePatient,
  ListStaff,
  FilterStaff,
  StaffSearch,
  SendOtp,
  PasswordForget,
  ResetPasword,
  HomeDashBoard,
  ScoreBishop,
  ParityList,
  PlanList,
  HistoryTransfer,
  UpdateLabourStatus,
  AddLcg,
  CompleteDelivery,
  BabyAdd,
  ScoreApgar,
  ListBaby,
  UpdateBaby,
  DrugCategoryList,
  DrugsAdd,
  ListDrug,
  DrugStatus,
  DecisionLcg,
  DetailLcg,
  DutyStatus,
  NotfStatus,
  ProfileStaff,
  ProfileStaffUpdate,
  PassChange,
  DetailPatient,
  PatienRoundDetail,
  FilterRound,
  SearchRound,
  FcmTokenSet,
  ListNotifications,
  ReportLcg,
  AlertHideToggle
};
