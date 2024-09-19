# CI pipeline for a .net application backend coded in c# deployed on aws

## Linting

Sonarqube is the linting solution used, as it is the industry standard for
dotnet applications.

## Testing

xUnit is the primary testing solution used, it is the primary recommended
framework in the official docs.

> "xUnit is a free, open-source, community-focused unit testing tool for .NET."

- learn.microsoft.com

AutoFixture is a library to generate anonymous variables for testing using class
and type definitons which simplifies the setup of the initial state for tests.

FluentAssertions library to test the behavior of observables

## Building and deploying

Building is done using dotnet cli commands run by shell scripts inside docker
containers created and configured by Make.

Tests and linting is then done by buildkite by running the respective scripts in
the containers and finally if the build passes and is manually approved for
production buildkite runs the make command which runs the shell script inside
said docker containers to run the terraform cli commands which deploy it to aws.

## CI solution

Buildkite is the ci cloud-hosted altenative solution used here as it is simple and
inexpensive and supports our needs out of the box

## Why Cloud-Based

A cloud based solution is used because its not resource intensive nor any
particularly hyper-specific tomfoolery happening and thus there are no benefits
for investing in a self-hosted one.
