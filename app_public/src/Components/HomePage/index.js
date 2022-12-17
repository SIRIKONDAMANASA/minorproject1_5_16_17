import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { wrapperStyle, titleStyle, subTitleStyle, componentStyle, boxStyle, titleWrapperStyle, thumbnailWrapperStyle, componentTitleStyle, UIComponentStyle, descWrapperStyle, linkWrapperStyle, linkStyle, logoutBtn } from "./style";

import * as actions from "../../store/action";


class HomePage extends React.Component {
	render() {
		let authRedirect = null;
		if (!this.props.isLoggedIn) {
			authRedirect = <Redirect to="/login" />;
		}

		return (
			<div css={wrapperStyle()}>
				{authRedirect}
				


				<div css={componentStyle()}>
					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							
							<h2 css={componentTitleStyle()}>Conversations</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								The <code>CometChatConversationListWithMessages</code> component launches Conversation list with messaging.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/conversations">
									Launch
								</Link>
							</li>
						</ul>
					</div>

					

					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
							</div>
							<h2 css={componentTitleStyle()}>Users</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								The <code>CometChatUserListWithMessages</code> component launches User list with messaging.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/users">
									Launch
								</Link>
							</li>
						</ul>
					</div>
				</div>

			

					


				
				<div css={logoutBtn()}>
					<button type="button" onClick={this.props.onLogout}>
						Logout
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		error: state.error,
		isLoggedIn: state.isLoggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
