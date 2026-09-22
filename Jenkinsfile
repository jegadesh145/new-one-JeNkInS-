/*
 * ==========================================================================
 *  Jenkinsfile - Declarative Pipeline
 *  Project : Jenkins CI/CD Demo Website (a plain static website)
 *  Repo    : https://github.com/jegadesh145/new-one-JeNkInS-
 *  Branch  : main
 * --------------------------------------------------------------------------
 *  STEP 1 goals
 *    1. Checkout - download the latest code from GitHub
 *    2. Validate - check that index.html, style.css and script.js exist
 *    3. Build    - check that this really is a static HTML/CSS/JS project
 *    4. Deploy   - placeholder only, the real deployment comes later
 *
 *  Jenkins is running on Windows, so every command uses the "bat" step,
 *  which runs the commands in cmd.exe. Because of that, all of the commands
 *  below are normal Windows commands (if exist, findstr, dir, echo).
 * ==========================================================================
 */

pipeline {

    /* Run on any available node. For a local Jenkins this is the built-in node. */
    agent any

    stages {

        /* ------------------------------------------------------------------
         * STAGE 1 - Checkout
         * Jenkins copies the newest commit from GitHub into its workspace,
         * so that the next stages have the project files to work with.
         * ------------------------------------------------------------------ */
        stage('Checkout') {
            steps {
                echo 'STAGE 1 - Checkout: getting the latest code from GitHub...'

                // "checkout scm" is the standard Jenkins SCM checkout.
                // It uses the Git repository and branch configured in the job.
                checkout scm

                // Nice extra information in the console log.
                echo "Branch being built : ${env.GIT_BRANCH}"
                echo "Commit being built : ${env.GIT_COMMIT}"
            }
        }

        /* ------------------------------------------------------------------
         * STAGE 2 - Validate
         * Only checks that the three files the website needs are there.
         * If a file is missing we run "exit /b 1", which returns exit code 1,
         * and Jenkins then marks this stage and the whole build as FAILED.
         * ------------------------------------------------------------------ */
        stage('Validate') {
            steps {
                echo 'STAGE 2 - Validate: checking that the required files exist...'
                bat '''
                    @echo off
                    if not exist index.html (echo [Validate] ERROR - index.html is missing. & exit /b 1)
                    if not exist style.css  (echo [Validate] ERROR - style.css is missing. & exit /b 1)
                    if not exist script.js  (echo [Validate] ERROR - script.js is missing. & exit /b 1)
                    echo [Validate] OK - all three required files are present.
                    dir /b index.html style.css script.js
                '''
            }
        }

        /* ------------------------------------------------------------------
         * STAGE 3 - Build
         * There is nothing to compile here: no npm, no Node.js, no React,
         * no backend and no database. So "building" means proving that this
         * is a plain static HTML/CSS/JavaScript website.
         * ------------------------------------------------------------------ */
        stage('Build') {
            steps {
                echo 'STAGE 3 - Build: static website, so there is nothing to compile.'
                bat '''
                    @echo off
                    echo [Build] Checking that no Node.js project file is present...
                    if exist package.json (echo [Build] ERROR - package.json found, this should not be a Node.js project. & exit /b 1)

                    echo [Build] Checking that index.html links the CSS and JavaScript files...
                    findstr /c:"style.css" index.html >nul || (echo [Build] ERROR - index.html does not link style.css. & exit /b 1)
                    findstr /c:"script.js" index.html >nul || (echo [Build] ERROR - index.html does not link script.js. & exit /b 1)

                    echo [Build] OK - this is a valid static HTML/CSS/JavaScript project.
                '''
            }
        }

        /* ------------------------------------------------------------------
         * STAGE 4 - Deploy (placeholder)
         * Nothing is published yet. In a later step this stage will be
         * replaced with the real deployment of the website.
         * ------------------------------------------------------------------ */
        stage('Deploy') {
            steps {
                echo 'STAGE 4 - Deploy: placeholder stage, nothing is published yet.'
                bat 'echo [Deploy] SIMULATED - the website files are ready. Real deployment will be added in the next step.'
            }
        }
    }

    /* ----------------------------------------------------------------------
     * POST ACTIONS
     * These run after all the stages have finished.
     * ---------------------------------------------------------------------- */
    post {
        success {
            echo 'PIPELINE SUCCESS - checkout, validate and build all passed. Deploy is still only a placeholder.'
        }
        failure {
            echo 'PIPELINE FAILED - look above for the line that starts with [ERROR] to see what went wrong.'
        }
        always {
            echo 'PIPELINE FINISHED - this message is always printed, even if the build failed.'
        }
    }
}
