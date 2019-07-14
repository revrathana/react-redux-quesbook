import { client } from '../constants/graphQL';
import gql from 'graphql-tag';

export async function getCurrentUserAPI(params) {
    return await client
        .query({
            query: gql`
                query {
                    currentUser: current_user {
                        id
                        name
                        avatar
                        email
                        first_name
                        last_name
                        exam_type_names
                        type
                        one_of_section_part1_finished
                        current_test
                        status
                    }
                }
            `,
            fetchPolicy: 'network-only'
        })
        .then(res => {
            return res.data;
        })
        .catch(e => {
            console.info(e);
        });
}

export async function getCurrentUserTestInfoAPI(params) {
    return await client
        .query({
            query: gql`
                query {
                    currentStudent: currentStudentInfo {
                        id
                        name
                        school_name
                        first_name
                        last_name
                        nick_name
                        mobile_phone
                        grade
                        avatar
                        free_trial
                        created_at
                        avatarFileName: avatar
                        plan_transactions {
                            status
                            card_number
                            card_type
                            expiration_date
                            plan
                        }
                        profile {
                            has_taken_sat
                            has_taken_act
                            test_goals {
                                sat_goal_total_score
                                sat_goal_math_score
                                sat_goal_readingwriting_score
                                next_sat_date
                                act_goal_total_score
                                act_goal_english_score
                                act_goal_math_score
                                act_goal_reading_score
                                act_goal_science_score
                                next_act_date
                            }
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only'
        })
        .then(res => {
            return res.data;
        })
        .catch(e => {
            console.info(e);
        });
}

export async function saveChangeStudent(...arg) {
    return await client
        .mutate({
            mutation: gql`
                mutation(
                    $first_name: String
                    $last_name: String
                    $nick_name: String
                    $mobile_phone: String
                    $school_name: String
                    $avatar_url: String
                    $profile_attributes: StudentProfileInputType
                ) {
                    currentStudent: updateStudentInfo(
                        first_name: $first_name
                        last_name: $last_name
                        nick_name: $nick_name
                        mobile_phone: $mobile_phone
                        school_name: $school_name
                        avatar_url: $avatar_url
                        profile_attributes: $profile_attributes
                    ) {
                        id
                        name
                        first_name
                        last_name
                        nick_name
                        mobile_phone
                        grade
                        avatar
                        avatarFileName: avatar
                        profile {
                            has_taken_sat
                            has_taken_act
                            test_goals {
                                sat_goal_total_score
                                sat_goal_math_score
                                sat_goal_readingwriting_score
                                next_sat_date
                                act_goal_total_score
                                act_goal_english_score
                                act_goal_math_score
                                act_goal_reading_score
                                act_goal_science_score
                                next_act_date
                            }
                        }
                    }
                }
            `,
            variables: {
                first_name: arg[0].first_name,
                last_name: arg[0].last_name,
                nick_name: arg[0].nick_name,
                mobile_phone: arg[0].mobile_phone,
                school_name: arg[0].school_name,
                avatar_url: arg[0].avatarFileName,
                profile_attributes: arg[0].profile_attributes
            }
        })
        .then(res => {
            // window.location.reload();
            return res.data;
        });
}

export async function changePassword(...arg) {
    try {
        let token = cookie.get(TOKEN_KEY);
        const res = await fetch(API_URL + '/api/v1/user/password', {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(arg[0])
        });
        const data = await res.json();
        if (data.errors) {
            alert(data.errors[0].detail);
        }
        console.log('changePassword', data);
        return data;
    } catch (error) {
        if (error) {
            alert('Password Changed!');
        }
        console.log('changePassword', error);
    }
}

export async function uploadAvatar(...arg) {
    try {
        let body = new FormData();
        let isProd = window.location.hostname === 'app.quesbook.com';
        // let isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
        console.log('uploadAvatar isProd: %s', isProd);
        body.append('avatar', arg[0].avatar);
        body.append('userID', arg[0].userID);
        body.append('isProd', isProd);
        const res = await fetch(API_UPLOAD + '/uploadAvatar', {
            method: 'POST',
            body: body
        });
        const data = await res.json();
        console.log('uploadAvatar isProd', data);
        return data;
    } catch (error) {
        console.log('uploadAvatar isProd', error);
    }
}

export async function cancelPlan(...arg) {
    try {
        let token = cookie.get(TOKEN_KEY);
        const res = await fetch(API_URL + '/api/v1/plan/cancel', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(arg[0])
        });
        const data = await res.json();
        if (data.errors) {
            alert(data.errors[0].detail);
        }
        return data;
    } catch (error) {
        if (error) {
            console.log('sendFeedback ', error);
        }
    }
}

export async function payment(...arg) {
    try {
        let token = cookie.get(TOKEN_KEY);
        const res = await fetch(API_URL + '/api/v1/user/payment', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(arg[0])
        });
        const data = await res.json();
        if (data.errors) {
            alert(data.errors[0].detail);
        }
        return data;
    } catch (error) {
        if (error) {
            console.log('sendFeedback ', error);
        }
    }
}
export async function updatePaymentInfo(...arg) {
    try {
        let token = cookie.get(TOKEN_KEY);
        const res = await fetch(API_URL + '/api/v1/update_credit_payment', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(arg[0])
        });
        const data = await res.json();
        if (data.errors) {
            alert(data.errors[0].detail);
        }
        window.location.reload();
        return data;
    } catch (error) {
        if (error) {
            console.log('sendFeedback ', error);
            window.location.reload();
        }
    }
}

export async function updatePlanFreeTrial(...arg) {
    try {
        let token = cookie.get(TOKEN_KEY);
        const res = await fetch(API_URL + '/api/v1/change_plan', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(arg[0])
        });
        const data = await res.json();
        if (data.errors) {
            alert(data.errors[0].detail);
        }
        window.location.reload();
        return data;
    } catch (error) {
        if (error) {
            console.log('sendFeedback ', error);
            window.location.reload();
        }
    }
}

export async function updatePlan(...arg) {
    try {
        let token = cookie.get(TOKEN_KEY);
        const res = await fetch(API_URL + '/api/v1/change_plan', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(arg[0])
        });
        const data = await res.json();
        if (data.errors) {
            alert(data.errors[0].detail);
        }
        window.location.reload();
        return data;
    } catch (error) {
        if (error) {
            console.log('sendFeedback ', error);
            window.location.reload();
        }
    }
}
