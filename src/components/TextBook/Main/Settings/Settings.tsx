/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { UserSettings } from '@/types/response.types';
import getUserSettings from '@/utils/getUserSettings';
import putUserSettings from '@/utils/putUserSettings';

const Settings = (): JSX.Element => {
  const [wordsPerDay, setWordsPerDay] = useState('10');
  const [optionalSettings, setOptionalSettings] = useState({
    wordTranslate: false,
    textTranslate: false,
    hardButton: false,
    repeatButton: false,
    deleteButton: false,
  });

  useEffect(() => {
    getUserSettings()
      .then((responseSettings: UserSettings) => {
        setWordsPerDay(`${responseSettings.wordsPerDay}`);
        setOptionalSettings(responseSettings.optional);
      })
      .catch(err => console.log(err));
  }, []);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {wordsPerDay}
    </Tooltip>
  );

  const saveChangeHandler = () => {
    putUserSettings(+wordsPerDay, optionalSettings)
      .then()
      .catch(err => console.log(err));
  };

  return (
    <div>
      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>Range</Form.Label>
            <Form.Control
              type="range"
              min="10"
              max="60"
              step="10"
              onChange={e => setWordsPerDay(e.target.value)}
              defaultValue="10"
              value={wordsPerDay}
            />
          </Form.Group>
        </Form>
      </OverlayTrigger>
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Перевод изучаемого слова"
        checked={optionalSettings ? optionalSettings.wordTranslate : false}
        onChange={e => setOptionalSettings({
          ...optionalSettings,
          wordTranslate: e.target.checked,
        })}
      />
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Перевод предложений"
        checked={optionalSettings ? optionalSettings.textTranslate : false}
        onChange={e => setOptionalSettings({
          ...optionalSettings,
          textTranslate: e.target.checked,
        })}
      />
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Кнопка 'Это было сложно'"
        checked={optionalSettings ? optionalSettings.hardButton : false}
        onChange={e => setOptionalSettings({
          ...optionalSettings,
          hardButton: e.target.checked,
        })}
      />
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Кнопка 'Это нужно повторить'"
        checked={optionalSettings ? optionalSettings.repeatButton : false}
        onChange={e => setOptionalSettings({
          ...optionalSettings,
          repeatButton: e.target.checked,
        })}
      />
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Кнопка 'Удалить это слово, я его знаю'"
        checked={optionalSettings ? optionalSettings.deleteButton : false}
        onChange={e => setOptionalSettings({
          ...optionalSettings,
          deleteButton: e.target.checked,
        })}
      />
      <button type="button" onClick={saveChangeHandler}>
        Применить
      </button>
    </div>
  );
};

export default Settings;
