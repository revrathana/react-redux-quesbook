import React, { Component } from 'react';
import QbNextSkillCard from './QbSkillCard/QbNextSkillCard';
import { fn_ParsePercentage } from '../../../util/helpers';
import './QbTopicCard.css';

class QbTopicCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { topicName, skillList, showScore }  = this.props;
    let topics = skillList[0]
    let skills = skillList[1]
    return (
      <div className="topic-card">
        <div className="topic-name">
          <h4>{`${topicName}`}</h4>
        </div>
        <div className="skill-cards">
          {
            topics && topics.map((topic, index) => {
              let { name, article_id, drill_down_url, definition, id, section, completed_question_count } = topic;
              let progressPercentage = fn_ParsePercentage(25, completed_question_count)
              return (
                <QbNextSkillCard
                  objType="topic"
                  name={name}
                  definition={definition}
                  skillId={id}
                  section = {section.name.toLowerCase()}
                  progressPercentage={progressPercentage}
                  key={index} />
              );
            })
          }
          {
            skills && skills.map((skill, index) => {
              let { name, article_id, definition, id, section, question_total, question_answered, practice_by_skill_url } = skill;
              let progressPercentage = fn_ParsePercentage(question_total, question_answered)
              return (
                <QbNextSkillCard
                  objType="skill"
                  name={name}
                  practice_by_skill_url={practice_by_skill_url}
                  definition={definition}
                  skillArticleId={article_id}
                  skillId={id}
                  section = {section}
                  progressPercentage={progressPercentage}
                  key={index} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default QbTopicCard;
