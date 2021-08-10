/**
 * {@link Word} represents a vocabulary word that the user wants to learn.
 * It contains a default translation and a Miwok translation for that word.
 */
export default class Word {
    /**
     * Create a new Word object.
     *
     * @param defaultTranslation is the word in a language that the user is already familiar with
     *                           (such as English)
     * @param miwokTranslation is the word in the Miwok language
     */
    constructor(defaultTranslation, miwokTranslation) {
        this.mDefaultTranslation = defaultTranslation
        this.mMiwokTranslation = miwokTranslation
    }

    /**
     * Get the default translation of the word.
     */
    get getDefaultTranslation() {
        return this.mDefaultTranslation
    }

    /**
     * Get the Miwok translation of the word.
     */
    get getMiwokTranslation() {
        return this.mMiwokTranslation;
    }

}