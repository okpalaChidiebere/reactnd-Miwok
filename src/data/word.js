/**
 * {@link Word} represents a vocabulary word that the user wants to learn.
 * It contains a default translation and a Miwok translation for that word.
 */
export default class Word {
    /** Default translation for the word */
    #mDefaultTranslation

    /** Miwok translation for the word */
    #mMiwokTranslation

    /** Image resource ID for the word */
    #mImageResourceId

    /**
     * Create a new Word object.
     *
     * @param defaultTranslation is the word in a language that the user is already familiar with
     *                           (such as English)
     * @param miwokTranslation is the word in the Miwok language
     * @param imageResourceId is the drawable resource ID for the image associated with the word
     */
    constructor(defaultTranslation, miwokTranslation, imageResourceId) {
        this.#mDefaultTranslation = defaultTranslation
        this.#mMiwokTranslation = miwokTranslation
        this.#mImageResourceId = imageResourceId
    }

    /**
     * Get the default translation of the word.
     */
    get getDefaultTranslation() {
        return this.#mDefaultTranslation
    }

    /**
     * Get the Miwok translation of the word.
     */
    get getMiwokTranslation() {
        return this.#mMiwokTranslation;
    }

    /**
     * Return the image resource ID of the word.
     */
    get getImageResourceId() {
        return this.#mImageResourceId
    }

}
//Learn more on JS classes here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
//explore concepts words like: Static Methods, SubClasses, etc

/**
 * Working with APIs, ideally you already know the type of objects that your app is using in the backEnd
 * But having to define the class here as well helps to understand what type of data is flowing in the
 * the app front-end as well :)
 */