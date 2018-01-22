/* @flow */

import type { Dispatch } from 'redux';

import {
    ADD_AUDIO,
    PLAY_AUDIO,
    REMOVE_AUDIO,
    SET_AUDIO_MUTED,
    SET_AUDIO_AVAILABLE,
    SET_CAMERA_FACING_MODE,
    SET_VIDEO_AVAILABLE,
    SET_VIDEO_MUTED,
    TOGGLE_CAMERA_FACING_MODE
} from './actionTypes';
import type { AudioElement } from './components/AbstractAudio';
import { CAMERA_FACING_MODE, VIDEO_MUTISM_AUTHORITY } from './constants';

/**
 * Registers given {@link AudioElement} to the Redux store under given
 * identifier.
 *
 * @param {string} audioId - The global sound identifier.
 * @param {AudioElement} audio - The audio element which will be added to
 * the Redux store.
 * @returns {{
 *     type: ADD_AUDIO,
 *     audioId: string,
 *     audio: AudioElement
 * }}
 */
export function addAudio(audioId: string, audio: AudioElement): Object {
    return {
        type: ADD_AUDIO,
        audioId,
        audio
    };
}

/**
 * Plays the audio identified by the given global identifier.
 *
 * @param {string} audioId - The global audio element instance identifier.
 * @returns {{
 *     type: PLAY_AUDIO,
 *     audioId: string
 * }}
 */
export function playAudio(audioId: string): Object {
    return {
        type: PLAY_AUDIO,
        audioId
    };
}

/**
 * Removes the audio element from the Redux store identified by the given id.
 *
 * @param {string} audioId - The global audio element instance identifier.
 * @returns {{
 *     type: REMOVE_AUDIO,
 *     audioId: string
 * }}
 */
export function removeAudio(audioId: string): Object {
    return {
        type: REMOVE_AUDIO,
        audioId
    };
}

/**
 * Action to adjust the availability of the local audio.
 *
 * @param {boolean} available - True if the local audio is to be marked as
 * available or false if the local audio is not available.
 * @returns {{
 *      type: SET_AUDIO_AVAILABLE,
 *      available: boolean
 *  }}
 */
export function setAudioAvailable(available: boolean) {
    return {
        type: SET_AUDIO_AVAILABLE,
        available
    };
}

/**
 * Action to set the muted state of the local audio.
 *
 * @param {boolean} muted - True if the local audio is to be muted or false if
 * the local audio is to be unmuted.
 * @param {boolean} ensureTrack - True if we want to ensure that a new track is
 * created if missing.
 * @returns {{
 *     type: SET_AUDIO_MUTED,
 *     ensureTrack: boolean,
 *     muted: boolean
 * }}
 */
export function setAudioMuted(muted: boolean, ensureTrack: boolean = false) {
    return {
        type: SET_AUDIO_MUTED,
        ensureTrack,
        muted
    };
}

/**
 * Action to set the facing mode of the local camera.
 *
 * @param {CAMERA_FACING_MODE} cameraFacingMode - The camera facing mode to set.
 * @returns {{
 *     type: SET_CAMERA_FACING_MODE,
 *     cameraFacingMode: CAMERA_FACING_MODE
 * }}
 */
export function setCameraFacingMode(cameraFacingMode: CAMERA_FACING_MODE) {
    return {
        type: SET_CAMERA_FACING_MODE,
        cameraFacingMode
    };
}

/**
 * Action to adjust the availability of the local video.
 *
 * @param {boolean} available - True if the local video is to be marked as
 * available or false if the local video is not available.
 * @returns {{
 *     type: SET_VIDEO_AVAILABLE,
 *     available: boolean
 * }}
 */
export function setVideoAvailable(available: boolean) {
    return {
        type: SET_VIDEO_AVAILABLE,
        available
    };
}

/**
 * Action to set the muted state of the local video.
 *
 * @param {boolean} muted - True if the local video is to be muted or false if
 * the local video is to be unmuted.
 * @param {number} authority - The {@link VIDEO_MUTISM_AUTHORITY} which is
 * muting/unmuting the local video.
 * @param {boolean} ensureTrack - True if we want to ensure that a new track is
 * created if missing.
 * @returns {Function}
 */
export function setVideoMuted(
        muted: boolean,
        authority: number = VIDEO_MUTISM_AUTHORITY.USER,
        ensureTrack: boolean = false) {
    return (dispatch: Dispatch<*>, getState: Function) => {
        const oldValue = getState()['features/base/media'].video.muted;

        // eslint-disable-next-line no-bitwise
        const newValue = muted ? oldValue | authority : oldValue & ~authority;

        return dispatch({
            type: SET_VIDEO_MUTED,
            ensureTrack,
            muted: newValue
        });
    };
}

/**
 * Toggles the camera facing mode. Most commonly, for example, mobile devices
 * such as phones have a front/user-facing and a back/environment-facing
 * cameras. In contrast to setCameraFacingMode, allows the toggling to be
 * optimally and/or natively implemented without the overhead of separate reads
 * and writes of the current/effective camera facing mode.
 *
 * @returns {{
 *     type: TOGGLE_CAMERA_FACING_MODE
 * }}
 */
export function toggleCameraFacingMode() {
    return {
        type: TOGGLE_CAMERA_FACING_MODE
    };
}
