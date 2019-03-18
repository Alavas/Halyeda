import React from 'react'
import resume from '../resume.json'

const About = () => {
	const jobs = Object.keys(resume.experience)
	const experience = jobs.map((job, index) => {
		return (
			<li key={index}>
				<li key={index} className="collection-header job">
					{job}
				</li>
				<ul className="collection-item position-list">
					{Object.keys(resume.experience[job]).map((position, index) => {
						return (
							<li key={index} className="job-position">
								{position}
								<ul className="task-list">
									{resume.experience[job][position].map(
										(task, index) => {
											return (
												<li key={index} className="task">
													&bull;
													{task}
												</li>
											)
										}
									)}
								</ul>
							</li>
						)
					})}
				</ul>
			</li>
		)
	})
	const skills = resume.skills.map((skill, index) => {
		return (
			<span
				key={index}
				className="new badge skill"
				data-badge-caption={skill}
			/>
		)
	})

	return (
		<div className="resume">
			<h6 className="intro">
				Justin is a pretty cool guy, you should totally hire him, he'll
				definitely be your Slack friend.
				<br />
				Contact me -{' '}
				<a href="mailto:justin@halyeda.com" target="_top">
					justin@halyeda.com
				</a>
			</h6>
			<ul className="collection with-header job-list">
				<li className="collection-header job-header">Skills</li>
				<li className="skills collection-item">{skills}</li>
				<li className="collection-header job-header">Experience</li>
				{experience}
			</ul>
		</div>
	)
}

export default About
