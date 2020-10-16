import React, { Component, Fragment } from 'react'
import {
    Container,
    Row,
    Col,
    Card
} from 'reactstrap';
import { ThemeContext } from 'helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as themeActions from 'action/theme'
import {HeaderWithToggler} from 'component/Header/publicUser'
import ApplicationCard from 'component/Cards/ApplicationCard'
import Swiper from 'component/Swiper'
import Table from 'component/Table'
import _ from "lodash";
import moment from "moment";
import { PublicUser_submittedApplicationList } from 'helpers/tableDataMapper'
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import Pagination from "component/Pagination";

const { GENERATE_FORM_ID_API,GENERATE_IA_FORM_ID_API,GENERATE_IE_FORM_ID_API,GET_APPLICATION_LIST_API, GENERATE_EG_FORM_ID_API,GENERATE_PG_FORM_ID_API,GET_SYMR_FORM_ID } = API_BOOK.APPLICATION;

class UserDashboardClass extends Component {

    state = {
        cancelToken: axios.CancelToken.source(),
        applicationList : [],
        loading : false,
        pagination : {
            page : "1",
            total_pages:0
        },
        limit:10
    }

    applicationList = [
        {
            name: "INDIVIDUAL_ENTERISE",
            imageLocation: require('assets/images/iti.png'),
            description: 'IE_APPLICATION_CATEGORY_DESCRIPTION',
        },
        {
            name: "ENTERPRISE_GROUP",
            imageLocation: require('assets/images/producer-groups.png'),
            description: 'EG_APPLICATION_CATEGORY_DESCRIPTION',
        },
        {
            name: "DIFFERENTLY_ABLED",
            imageLocation: require('assets/images/physically_challenged_3.png'),
            description: 'IA_APPLICATION_CATEGORY_DESCRIPTION',
        },    
        {
            name: "YOUTH_MIGRANTH",
            imageLocation: require('assets/images/swarna-janti-rojgar.png'),
            description: 'SYMR_APPLICATION_CATEGORY_DESCRIPTION',
        }
    ]

    componentDidMount() {
        this.getApplicationList()
    }

    getLanguage = () => {
        return (this.props.languageSelected === 'ENGLISH') ? 'ODISHA' : 'ENGLISH'
    }

    //SERVICE

    generateFormId = async (name) => {

        let LOCAL_END_POINT, LOCAL_PATH;

        if(name === "PRODUCER_COLLECTIVE"){

            LOCAL_END_POINT = GENERATE_FORM_ID_API;
            LOCAL_PATH = "/application/productiveCollective"

        }else if(name === 'PRODUCER_GROUP'){

            LOCAL_END_POINT = GENERATE_PG_FORM_ID_API;
            LOCAL_PATH = "/application/producerGroup"

        }else if(name == 'YOUTH_MIGRANTH'){
            
             LOCAL_END_POINT = GET_SYMR_FORM_ID;
            LOCAL_PATH = "/application/symr"
        }
        else if(name == "ENTERPRISE_GROUP"){
            LOCAL_END_POINT = GENERATE_EG_FORM_ID_API;
            LOCAL_PATH = "/application/producerGroup"
        }
        else if(name == "DIFFERENTLY_ABLED"){
            LOCAL_END_POINT = GENERATE_IA_FORM_ID_API;
            LOCAL_PATH = "/application/diffabledVulnerable"
        }else{
            LOCAL_PATH = "/application/individualEnterprise";
            LOCAL_END_POINT = GENERATE_IE_FORM_ID_API
        }
        const { cancelToken } = this.state
        let requestPayload = {
            ...LOCAL_END_POINT,
            cancelToken: cancelToken.token,
        };

        if(name=='INDIVIDUAL_ENTERISE'){
            let response = await API(requestPayload);
            if(response.status === 200){
                localStorage.setItem('createAppformId',response.data.data.formId)
                this.props.history.push(LOCAL_PATH)
            }
        }else{
            this.props.history.push(LOCAL_PATH)
            
        }
            
        
    }

   getSYMRFormId = async (path) =>{

      const { cancelToken } = this.state
        let requestPayload = {
            ...GET_SYMR_FORM_ID,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload)

        if(response.status === 200){

            localStorage.setItem('createAppformId',response.data.data.formId)

            this.props.history.push(path)

        }
        else toast(response.data.message,'error')

   }

    getApplicationList = async (page=1) => {
        const { cancelToken,pagination,limit } = this.state

        let requestPayload = {
            ...GET_APPLICATION_LIST_API,
            params:{
                page,
                limit
            },
            cancelToken: cancelToken.token,
        };

        this.setState({ loading : true })

        let response = await API(requestPayload);

        if(response.status === 200)

            this.setState({
                applicationList : response.data.data.forms,
                pagination : response.data.data.meta.pagination
            })

        else toast(response.data.emptyMessage,'error')
        
        this.setState({ loading : false })
    }

    handleApplicationDetailRedirection = ({ formId,status,type }) => {
        switch(type){
            case 1:
                if(status === 1)
                {
                    localStorage.setItem('createAppformId',formId)
                    this.props.history.push('/application/productiveCollective/section/1')
                }else{
                    this.props.history.push(`/application/productiveCollective/view/${formId}`)
                }
            break;
            case 2:
                if(status === 1)
                {
                    localStorage.setItem('createAppformId',formId)
                    this.props.history.push('/application/producerGroup/section/1')
                }else{
                    this.props.history.push(`/application/producerGroup/view/${formId}`)
                }
            break;
            case 3:
                if(status === 1)
                {
                    localStorage.setItem('createAppformId',formId)
                    this.props.history.push('/application/enterpriseGroup/section/1')
                }else{
                    this.props.history.push(`/application/enterpriseGroup/view/${formId}`)
                }
            break;
            case 4:
                if(status === 1)
                {
                    localStorage.setItem('createAppformId',formId)
                    this.props.history.push('/application/symr/section/1')
                }else{
                    this.props.history.push(`/application/symr/view/${formId}`)
                }
            break;
        }

    }

    nextpage = (page) => {
        this.getApplicationList(page)
    }

    render() {
        let theme = this.context;
        const { loading,applicationList,pagination } = this.state
        let table = {...PublicUser_submittedApplicationList}
        // table.rows=applicationList
        table.rows=[]
        return (
            <main className="mt-4 application-list-main-container mx-sm-2">
                <Container fluid>

                    {/* CHOOSE APPICATION SECTION */}

                    <section id="choose-application">
                        <HeaderWithToggler
                            name={theme.CHOOSE_APPLICATION_TYPE}
                            withFlexContainer={true}
                            showToggler={true}
                        />
                        <Swiper className="d-md-none d-lg-none d-sm-block">
                            {
                                this.applicationList.map((data, key) => (
                                    <div key={key}>
                                        <ApplicationCard
                                            name={theme[data.name]}
                                            image={data.imageLocation}
                                            onClick={ () => this.generateFormId(data.name) }
                                            description={theme[data.description]}
                                        />
                                    </div>

                                ))
                            }
                        </Swiper>
                        <div className="d-md-block d-none">
                            <Row className="mb-3">
                                {
                                    this.applicationList.map((data, key) => (
                                        <Col lg="4" sm="6">
                                            <ApplicationCard
                                                name={theme[data.name]}
                                                image={data.imageLocation}
                                                onClick={ () => this.generateFormId(data.name) }
                                                description={theme[data.description]}
                                            />
                                        </Col>
                                    ))
                                }

                            </Row>
                        </div>
                    </section>

                    {/* APPLICATION SUBMITTED SECTION  */}

                    <section id="application-submitted">
                        <HeaderWithToggler name={theme.SUBMITTED_APPLICATION} withFlexContainer={true} />
                        {/* {console.log(table,"table")} */}
                        <Card className="borderless px-2">
                            <Table
                                data={table}
                                isLoading={loading}
                                onClick={this.handleApplicationDetailRedirection}
                                emptyMessage={theme["SUBMITTED_APPLICATION_EMPTY"]}
                            />
                            <div className="pt-3">
                            <Pagination 
                                    pageCount={pagination.total_pages} 
                                    page={pagination.page}
                                    onPageChange={this.nextpage}
                                />
                        </div>
                        </Card>
                    </section>
                </Container>
            </main>
        )
    }
}

UserDashboardClass.contextType = ThemeContext;

const mapStateToProps = (state) => {
    return state.theme
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(themeActions, dispatch)
}

export const UserDashboard = connect(mapStateToProps, mapDispatchToProps)(UserDashboardClass)
